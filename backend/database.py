import sqlite3
import os
import json
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), 'sharecare.db')

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    conn.execute("PRAGMA foreign_keys = ON")
    return conn

def init_db():
    conn = get_db()
    cursor = conn.cursor()

    # Users
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        phone TEXT,
        location TEXT,
        role TEXT NOT NULL CHECK(role IN ('donor', 'receiver', 'volunteer', 'admin')),
        avatar_url TEXT,
        bio TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    # Volunteer Profiles
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS volunteer_profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER UNIQUE NOT NULL,
        available_days TEXT,
        preferred_activity TEXT,
        skills TEXT,
        vehicle_type TEXT,
        is_verified INTEGER DEFAULT 1,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
    ''')

    # Donations
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS donations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        donor_id INTEGER NOT NULL,
        donor_name TEXT NOT NULL,
        title TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT,
        quantity REAL NOT NULL,
        unit TEXT NOT NULL,
        images TEXT DEFAULT '[]',
        pickup_location TEXT NOT NULL,
        latitude REAL,
        longitude REAL,
        available_date TEXT,
        prep_date TEXT,
        use_by_date TEXT,
        is_food INTEGER DEFAULT 0,
        pickup_or_drop TEXT DEFAULT 'pickup',
        instructions TEXT,
        status TEXT NOT NULL DEFAULT 'approved' CHECK(status IN ('pending', 'approved', 'assigned', 'picked_up', 'out_for_delivery', 'delivered', 'completed', 'rejected', 'cancelled')),
        is_emergency INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (donor_id) REFERENCES users(id) ON DELETE CASCADE
    )
    ''')

    # Help Requests
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS help_requests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        receiver_id INTEGER NOT NULL,
        receiver_name TEXT NOT NULL,
        is_anonymous INTEGER DEFAULT 0,
        category TEXT NOT NULL,
        quantity REAL NOT NULL,
        unit TEXT NOT NULL,
        description TEXT,
        location TEXT NOT NULL,
        latitude REAL,
        longitude REAL,
        urgency TEXT NOT NULL DEFAULT 'medium' CHECK(urgency IN ('low', 'medium', 'high', 'critical')),
        status TEXT NOT NULL DEFAULT 'approved' CHECK(status IN ('pending', 'under_review', 'approved', 'matched', 'assigned', 'delivered', 'completed', 'rejected', 'cancelled')),
        is_emergency INTEGER DEFAULT 0,
        contact_phone TEXT,
        supporting_info TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
    )
    ''')

    # Donation Matches
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS donation_matches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        donation_id INTEGER NOT NULL,
        request_id INTEGER NOT NULL,
        match_percentage INTEGER NOT NULL,
        match_reasons TEXT,
        status TEXT DEFAULT 'suggested' CHECK(status IN ('suggested', 'requested', 'accepted', 'rejected')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (donation_id) REFERENCES donations(id) ON DELETE CASCADE,
        FOREIGN KEY (request_id) REFERENCES help_requests(id) ON DELETE CASCADE
    )
    ''')

    # Share Baskets (Combining multiple donations for a receiver's request)
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS share_baskets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        request_id INTEGER,
        category TEXT DEFAULT 'Family Grocery Kit',
        target_items TEXT NOT NULL, -- JSON array of {"name": "Rice", "required_qty": 5, "unit": "kg", "collected_qty": 5}
        location TEXT NOT NULL,
        status TEXT DEFAULT 'open' CHECK(status IN ('open', 'completed')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (request_id) REFERENCES help_requests(id) ON DELETE SET NULL
    )
    ''')

    # Basket Contributions
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS basket_contributions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        basket_id INTEGER NOT NULL,
        donor_id INTEGER NOT NULL,
        donor_name TEXT NOT NULL,
        item_name TEXT NOT NULL,
        quantity REAL NOT NULL,
        unit TEXT NOT NULL,
        status TEXT DEFAULT 'confirmed',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (basket_id) REFERENCES share_baskets(id) ON DELETE CASCADE,
        FOREIGN KEY (donor_id) REFERENCES users(id) ON DELETE CASCADE
    )
    ''')

    # Donation Kits (Ready-made kits)
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS donation_kits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT,
        icon_name TEXT,
        items TEXT NOT NULL, -- JSON array of {name, required, unit, pledged}
        beneficiaries_target INTEGER DEFAULT 50,
        beneficiaries_reached INTEGER DEFAULT 0,
        status TEXT DEFAULT 'active'
    )
    ''')

    # Volunteer Tasks
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS volunteer_tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        volunteer_id INTEGER,
        donation_id INTEGER,
        request_id INTEGER,
        task_title TEXT NOT NULL,
        task_type TEXT DEFAULT 'delivery' CHECK(task_type IN ('pickup', 'delivery', 'both')),
        pickup_address TEXT NOT NULL,
        pickup_lat REAL,
        pickup_lng REAL,
        delivery_address TEXT NOT NULL,
        delivery_lat REAL,
        delivery_lng REAL,
        priority TEXT DEFAULT 'normal' CHECK(priority IN ('normal', 'urgent', 'emergency')),
        status TEXT DEFAULT 'available' CHECK(status IN ('available', 'assigned', 'in_progress', 'completed', 'cancelled')),
        notes TEXT,
        assigned_at DATETIME,
        completed_at DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (volunteer_id) REFERENCES users(id) ON DELETE SET NULL,
        FOREIGN KEY (donation_id) REFERENCES donations(id) ON DELETE SET NULL,
        FOREIGN KEY (request_id) REFERENCES help_requests(id) ON DELETE SET NULL
    )
    ''')

    # QR Tracking (7 stages)
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS qr_tracking (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        donation_id INTEGER UNIQUE NOT NULL,
        tracking_code TEXT UNIQUE NOT NULL,
        current_stage INTEGER DEFAULT 1 CHECK(current_stage BETWEEN 1 AND 7),
        stage_history TEXT NOT NULL, -- JSON array of objects
        recipient_confirmation TEXT,
        last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (donation_id) REFERENCES donations(id) ON DELETE CASCADE
    )
    ''')

    # Notifications
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        type TEXT DEFAULT 'info' CHECK(type IN ('info', 'success', 'warning', 'emergency', 'match')),
        is_read INTEGER DEFAULT 0,
        link TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
    ''')

    # Feedback and Testimonials
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS feedback (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        user_name TEXT NOT NULL,
        user_role TEXT NOT NULL,
        rating INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
        comment TEXT NOT NULL,
        is_public_testimonial INTEGER DEFAULT 1,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
    ''')

    # Contact Messages
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS contact_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        status TEXT DEFAULT 'unread' CHECK(status IN ('unread', 'replied')),
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    # Emergency Mode System
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS emergency_config (
        id INTEGER PRIMARY KEY,
        is_active INTEGER DEFAULT 0,
        title TEXT DEFAULT 'Flood & Cyclone Relief Emergency Assistance',
        alert_message TEXT,
        affected_areas TEXT,
        emergency_helpline TEXT,
        supplies_needed TEXT, -- JSON array of item names
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    # Admin Audit Logs
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS admin_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        admin_id INTEGER,
        admin_name TEXT,
        action TEXT NOT NULL,
        details TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
    print("Database initialized successfully.")
