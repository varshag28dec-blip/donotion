import json
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash
from database import get_db, init_db

def seed():
    init_db()
    conn = get_db()
    cursor = conn.cursor()

    # Clear existing data
    tables = [
        'users', 'volunteer_profiles', 'donations', 'help_requests',
        'donation_matches', 'share_baskets', 'basket_contributions',
        'donation_kits', 'volunteer_tasks', 'qr_tracking', 'notifications',
        'feedback', 'contact_messages', 'emergency_config', 'admin_logs'
    ]
    for table in tables:
        cursor.execute(f"DELETE FROM {table}")
        cursor.execute(f"DELETE FROM sqlite_sequence WHERE name='{table}'")

    pw_hash = generate_password_hash('password123')

    # Seed Users
    users_data = [
        ('Ananya Sharma', 'donor@sharecare.org', pw_hash, '+91 98765 43210', 'Velachery, Chennai', 'donor', 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150', 'Active community donor passionate about zero food waste.'),
        ('Murugan R.', 'receiver@sharecare.org', pw_hash, '+91 98765 43211', 'Guindy, Chennai', 'receiver', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', 'Father of two school-going children seeking educational & grocery aid.'),
        ('Karthik Raja', 'volunteer@sharecare.org', pw_hash, '+91 98765 43212', 'Adyar, Chennai', 'volunteer', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', 'Two-wheeler owner available evenings and weekends for pickup & deliveries.'),
        ('Priya Venkat', 'admin@sharecare.org', pw_hash, '+91 98765 43213', 'T. Nagar, Chennai', 'admin', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150', 'Platform Administrator & Community Support Coordinator.')
    ]

    cursor.executemany('''
    INSERT INTO users (name, email, password_hash, phone, location, role, avatar_url, bio)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', users_data)

    donor_id = 1
    receiver_id = 2
    volunteer_id = 3
    admin_id = 4

    # Volunteer Profile
    cursor.execute('''
    INSERT INTO volunteer_profiles (user_id, available_days, preferred_activity, skills, vehicle_type, is_verified)
    VALUES (?, ?, ?, ?, ?, 1)
    ''', (volunteer_id, 'Mon, Wed, Fri, Sat, Sun', 'Food & Medical Supply Distribution', 'First Aid, Logistics, Local Route Expert', 'Motorcycle / Scooter'))

    now = datetime.now()
    today_str = now.strftime('%Y-%m-%d')
    food_useby_1 = (now + timedelta(hours=5)).strftime('%Y-%m-%d %H:%M')
    food_useby_2 = (now + timedelta(hours=18)).strftime('%Y-%m-%d %H:%M')
    food_useby_3 = (now + timedelta(hours=3)).strftime('%Y-%m-%d %H:%M')
    food_prep_1 = (now - timedelta(hours=2)).strftime('%Y-%m-%d %H:%M')

    # Seed Donations
    donations_data = [
        (
            donor_id, 'Ananya Sharma', 'Freshly Prepared Meals (Veg Pulao & Curd Rice)', 'Food',
            'Freshly cooked hygienic meals packed in eco-friendly aluminium foil boxes. Sourced from wedding catering surplus, completely untouched and safe.',
            25, 'Packets',
            json.dumps(['https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600']),
            'Velachery Main Road, Chennai', 12.9750, 80.2200,
            today_str, food_prep_1, food_useby_1, 1, 'pickup',
            'Please pick up before 9:00 PM. Keep insulated box during transit.',
            'approved', 0
        ),
        (
            donor_id, 'Ananya Sharma', 'Winter Jackets, Sweaters & Woolen Blankets', 'Clothes',
            'Assorted clean and laundered winter clothing in excellent condition. Sizes M to XL, along with 10 double-bed warm blankets for needy families.',
            20, 'Pieces',
            json.dumps(['https://images.unsplash.com/photo-1523381294911-8d3cead13475?w=600', 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600']),
            'Adyar Canal Bank, Chennai', 13.0012, 80.2565,
            today_str, None, None, 0, 'drop_off',
            'Items are sanitized and pre-packaged in protective transparent covers.',
            'approved', 0
        ),
        (
            donor_id, 'Ananya Sharma', 'NCERT Class 6-10 Textbooks & Oxford Dictionaries', 'Books',
            'Complete set of CBSE Class 6 to 10 textbooks including Mathematics, Science, Social Studies, plus English storybooks for middle school students.',
            45, 'Books',
            json.dumps(['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600', 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600']),
            'Guindy Industrial Estate, Chennai', 13.0067, 80.2030,
            today_str, None, None, 0, 'pickup',
            'Packaged in two sturdy cardboard boxes.',
            'approved', 0
        ),
        (
            donor_id, 'Ananya Sharma', 'Comprehensive Student Stationery Kits', 'School Supplies',
            'Contains geometry boxes, pencils, pens, erasers, sketch pens, and 5 unruled long notebooks per kit. Perfect for rural students.',
            30, 'Kits',
            json.dumps(['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600']),
            'Mylapore Luz Corner, Chennai', 13.0368, 80.2676,
            today_str, None, None, 0, 'pickup',
            'Ready to distribute to schools or community tutoring centers.',
            'approved', 0
        ),
        (
            donor_id, 'Ananya Sharma', 'Stainless Steel Cookware & Utensil Family Sets', 'Household Essentials',
            'Brand new induction-compatible stainless steel kadai, pressure cooker, plates, spoons, and water jugs for displaced or underprivileged families.',
            12, 'Sets',
            json.dumps(['https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600']),
            'Anna Nagar 2nd Avenue, Chennai', 13.0850, 80.2100,
            today_str, None, None, 0, 'pickup',
            'Heavy duty packaging, handle with care.',
            'approved', 0
        ),
        (
            donor_id, 'Ananya Sharma', 'Sanitary Care, Antiseptic Soaps & Hand Washes', 'Hygiene Essentials',
            'Biodegradable sanitary napkins, Dettol handwashes, bathing soaps, toothpaste, and soft toothbrushes.',
            50, 'Packs',
            json.dumps(['https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600']),
            'Velachery Bypass Road, Chennai', 12.9780, 80.2180,
            today_str, None, None, 0, 'pickup',
            'Sealed and dry storage boxes.',
            'approved', 0
        ),
        (
            donor_id, 'Ananya Sharma', 'Fresh Bakery Whole Wheat Bread & Fresh Milk', 'Food',
            'Surplus premium brown bread loaves (400g) and sealed toned milk pouches from local organic bakery.',
            15, 'Loaves',
            json.dumps(['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600']),
            'Saidapet Market, Chennai', 13.0200, 80.2220,
            today_str, food_prep_1, food_useby_3, 1, 'pickup',
            'Urgent rescue! High nutritional value, ideal for children shelter.',
            'approved', 0
        ),
        (
            donor_id, 'Ananya Sharma', 'Emergency Packaged Drinking Water (20L Cans)', 'Household Essentials',
            'Sealed ISI certified drinking water bubble top cans for water-logged flood relief shelters.',
            20, 'Cans',
            json.dumps(['https://images.unsplash.com/photo-1548839140-29a749e1bc4e?w=600']),
            'Tambaram Sanatorium, Chennai', 12.9249, 80.1000,
            today_str, None, None, 0, 'pickup',
            'Urgent disaster relief supply.',
            'approved', 1
        )
    ]

    for d in donations_data:
        cursor.execute('''
        INSERT INTO donations (
            donor_id, donor_name, title, category, description,
            quantity, unit, images, pickup_location, latitude, longitude,
            available_date, prep_date, use_by_date, is_food, pickup_or_drop,
            instructions, status, is_emergency
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', d)

    # Seed Help Requests
    requests_data = [
        (
            receiver_id, 'Murugan R.', 0, 'Food',
            5, 'Packets',
            'Need evening food packets for 5 members of my family including elderly parents and young daughter.',
            'Velachery 100ft Road, Chennai', 12.9790, 80.2210,
            'high', 'approved', 0, '+91 98765 43211', 'Daily wage laborer currently between work days.'
        ),
        (
            receiver_id, 'Murugan R.', 0, 'Books',
            10, 'Books',
            'NCERT Class 7 and 9 study books and geometry sets for my daughter and son in government school.',
            'Guindy Station Road, Chennai', 13.0080, 80.2050,
            'medium', 'approved', 0, '+91 98765 43211', 'Preparing for term exams.'
        ),
        (
            receiver_id, 'Anonymous Resident', 1, 'Clothes',
            4, 'Pieces',
            'Warm clothes and blankets for elderly persons suffering from cold weather conditions.',
            'Adyar Gandhi Nagar, Chennai', 13.0050, 80.2520,
            'high', 'approved', 0, None, 'Requested for local neighborhood shelter.'
        ),
        (
            receiver_id, 'Community Center Coordinator', 0, 'Household Essentials',
            10, 'Cans',
            'Clean drinking water urgently required for 15 displaced families due to localized water pipeline breakage.',
            'Tambaram West, Chennai', 12.9280, 80.1050,
            'critical', 'approved', 1, '+91 98765 43299', 'Ground floor flooded, drinking water supply cut off.'
        )
    ]

    for r in requests_data:
        cursor.execute('''
        INSERT INTO help_requests (
            receiver_id, receiver_name, is_anonymous, category,
            quantity, unit, description, location, latitude, longitude,
            urgency, status, is_emergency, contact_phone, supporting_info
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', r)

    # Seed Share Basket
    target_items_1 = [
        {"name": "Ponni Rice", "required_qty": 10, "unit": "kg", "collected_qty": 10},
        {"name": "Toor Dal / Pulses", "required_qty": 4, "unit": "kg", "collected_qty": 4},
        {"name": "Sunflower Cooking Oil", "required_qty": 3, "unit": "liters", "collected_qty": 2},
        {"name": "Whole Wheat Atta", "required_qty": 5, "unit": "kg", "collected_qty": 3},
        {"name": "Potatoes & Onions", "required_qty": 6, "unit": "kg", "collected_qty": 0}
    ]
    cursor.execute('''
    INSERT INTO share_baskets (title, description, request_id, category, target_items, location, status)
    VALUES (?, ?, 1, 'Family Grocery Basket', ?, 'Velachery, Chennai', 'open')
    ''', (
        'Community Grocery Kit #104 – Support for 5-Member Family',
        'Help combine staples to supply a comprehensive 1-month kitchen ration kit for Murugan’s family.',
        json.dumps(target_items_1)
    ))
    basket_id_1 = cursor.lastrowid

    basket_contributions_data = [
        (basket_id_1, donor_id, 'Ananya Sharma', 'Ponni Rice', 10, 'kg', 'confirmed'),
        (basket_id_1, donor_id, 'Ananya Sharma', 'Toor Dal / Pulses', 4, 'kg', 'confirmed'),
        (basket_id_1, donor_id, 'Ananya Sharma', 'Sunflower Cooking Oil', 2, 'liters', 'confirmed'),
        (basket_id_1, donor_id, 'Ananya Sharma', 'Whole Wheat Atta', 3, 'kg', 'confirmed')
    ]
    cursor.executemany('''
    INSERT INTO basket_contributions (basket_id, donor_id, donor_name, item_name, quantity, unit, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ''', basket_contributions_data)

    # Second Share Basket (Stationery Kit for Orphanage)
    target_items_2 = [
        {"name": "Ruled Notebooks", "required_qty": 50, "unit": "pieces", "collected_qty": 35},
        {"name": "Blue & Black Pens Pack", "required_qty": 20, "unit": "packs", "collected_qty": 15},
        {"name": "Mathematical Geometry Boxes", "required_qty": 15, "unit": "boxes", "collected_qty": 10},
        {"name": "Colour Pencil Sets", "required_qty": 20, "unit": "sets", "collected_qty": 5}
    ]
    cursor.execute('''
    INSERT INTO share_baskets (title, description, request_id, category, target_items, location, status)
    VALUES (?, ?, 2, 'Student Education Basket', ?, 'Guindy, Chennai', 'open')
    ''', (
        'Bright Future School Stationery Basket #202',
        'Gathering school supplies for 25 underprivileged kids in Guindy Community Study Center.',
        json.dumps(target_items_2)
    ))

    # Seed Donation Kits (Ready-made kits)
    kits = [
        ('Family Grocery Kit', 'Food', 'Provides monthly grains, pulses, cooking oil, spices, and tea for a family of 4-5 members.', 'Utensils', json.dumps([
            {'name': 'Rice (10kg)', 'required': 50, 'unit': 'bags', 'pledged': 38},
            {'name': 'Cooking Oil (2L)', 'required': 50, 'unit': 'cans', 'pledged': 42},
            {'name': 'Dal / Lentils (3kg)', 'required': 50, 'unit': 'packs', 'pledged': 35},
            {'name': 'Salt & Spices Kit', 'required': 50, 'unit': 'kits', 'pledged': 45}
        ]), 50, 36),
        ('Student Education Kit', 'School Supplies', 'Empowers school children with bags, notebooks, geometry kits, and water bottles.', 'BookOpen', json.dumps([
            {'name': 'School Bag', 'required': 40, 'unit': 'bags', 'pledged': 32},
            {'name': 'Notebook Set (6 pcs)', 'required': 40, 'unit': 'sets', 'pledged': 40},
            {'name': 'Stationery Pouch', 'required': 40, 'unit': 'pouches', 'pledged': 28},
            {'name': 'Steel Water Bottle', 'required': 40, 'unit': 'bottles', 'pledged': 25}
        ]), 40, 28),
        ('Household Essentials Kit', 'Household Essentials', 'Basic kitchen cookware, dinner plates, tumblers, and bedding essentials.', 'Home', json.dumps([
            {'name': 'Stainless Steel Cooker', 'required': 25, 'unit': 'pieces', 'pledged': 20},
            {'name': 'Dinner Set (4 Plates/Bowls)', 'required': 25, 'unit': 'sets', 'pledged': 18},
            {'name': 'Thermal Bed Blanket', 'required': 25, 'unit': 'pieces', 'pledged': 22}
        ]), 25, 18),
        ('Emergency Support Kit', 'Emergency', 'Rapid disaster response kit with drinking water, dry rations, first aid, torch, and power bank.', 'ShieldAlert', json.dumps([
            {'name': 'Packaged Drinking Water (10L)', 'required': 60, 'unit': 'units', 'pledged': 55},
            {'name': 'High Energy Biscuits & Bars', 'required': 60, 'unit': 'packs', 'pledged': 60},
            {'name': 'First Aid & Antiseptic Kit', 'required': 60, 'unit': 'kits', 'pledged': 48},
            {'name': 'LED Torch with Batteries', 'required': 60, 'unit': 'pieces', 'pledged': 39}
        ]), 60, 48),
        ('Clothing Kit', 'Clothes', 'Assortment of fresh sanitized clothes for adults and kids including shirts, trousers, and raincoats.', 'Shirt', json.dumps([
            {'name': 'Men / Women Casual Pack', 'required': 30, 'unit': 'packs', 'pledged': 25},
            {'name': 'Kids Wear Set', 'required': 30, 'unit': 'sets', 'pledged': 28},
            {'name': 'Raincoat / Windcheater', 'required': 30, 'unit': 'pieces', 'pledged': 20}
        ]), 30, 22)
    ]

    for k in kits:
        cursor.execute('''
        INSERT INTO donation_kits (name, category, description, icon_name, items, beneficiaries_target, beneficiaries_reached, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'active')
        ''', k)

    # QR Tracking for Donation 1 (7 stages)
    # 1. Donation Created
    # 2. Admin Verified
    # 3. Volunteer Assigned
    # 4. Donation Picked Up
    # 5. Out for Delivery
    # 6. Successfully Delivered
    # 7. Receiver Confirmation
    stage_history = [
        {"stage": 1, "name": "Donation Created", "status": "completed", "timestamp": (now - timedelta(hours=3)).strftime('%Y-%m-%d %H:%M:%S'), "updated_by": "Ananya Sharma (Donor)", "note": "Donation listing submitted with images and food safety details."},
        {"stage": 2, "name": "Admin Verified", "status": "completed", "timestamp": (now - timedelta(hours=2, minutes=30)).strftime('%Y-%m-%d %H:%M:%S'), "updated_by": "Priya V. (Admin)", "note": "Verified food preparation time and safety guidelines."},
        {"stage": 3, "name": "Volunteer Assigned", "status": "completed", "timestamp": (now - timedelta(hours=2)).strftime('%Y-%m-%d %H:%M:%S'), "updated_by": "System & Admin", "note": "Volunteer Karthik Raja accepted pickup task."},
        {"stage": 4, "name": "Donation Picked Up", "status": "completed", "timestamp": (now - timedelta(hours=1)).strftime('%Y-%m-%d %H:%M:%S'), "updated_by": "Karthik Raja (Volunteer)", "note": "Collected 25 sealed meal boxes in insulated carrying container."},
        {"stage": 5, "name": "Out for Delivery", "status": "in_progress", "timestamp": (now - timedelta(minutes=20)).strftime('%Y-%m-%d %H:%M:%S'), "updated_by": "Karthik Raja (Volunteer)", "note": "En route to Guindy community center distribution point."},
        {"stage": 6, "name": "Successfully Delivered", "status": "pending", "timestamp": None, "updated_by": None, "note": "Awaiting arrival at destination."},
        {"stage": 7, "name": "Receiver Confirmation", "status": "pending", "timestamp": None, "updated_by": None, "note": "Final sign-off by recipient."}
    ]

    cursor.execute('''
    INSERT INTO qr_tracking (donation_id, tracking_code, current_stage, stage_history, recipient_confirmation, last_updated)
    VALUES (1, 'SC-TRK-78901', 5, ?, 'Pending OTP/Digital Signature', CURRENT_TIMESTAMP)
    ''', (json.dumps(stage_history),))

    # Tracking for Donation 2
    stage_history_2 = [
        {"stage": 1, "name": "Donation Created", "status": "completed", "timestamp": (now - timedelta(days=1)).strftime('%Y-%m-%d %H:%M:%S'), "updated_by": "Ananya Sharma (Donor)", "note": "Created winter clothing donation."},
        {"stage": 2, "name": "Admin Verified", "status": "completed", "timestamp": (now - timedelta(hours=20)).strftime('%Y-%m-%d %H:%M:%S'), "updated_by": "Priya V. (Admin)", "note": "Verified listing content and sanitized tags."},
        {"stage": 3, "name": "Volunteer Assigned", "status": "pending", "timestamp": None, "updated_by": None, "note": "Waiting for volunteer acceptance."},
        {"stage": 4, "name": "Donation Picked Up", "status": "pending", "timestamp": None, "updated_by": None, "note": None},
        {"stage": 5, "name": "Out for Delivery", "status": "pending", "timestamp": None, "updated_by": None, "note": None},
        {"stage": 6, "name": "Successfully Delivered", "status": "pending", "timestamp": None, "updated_by": None, "note": None},
        {"stage": 7, "name": "Receiver Confirmation", "status": "pending", "timestamp": None, "updated_by": None, "note": None}
    ]
    cursor.execute('''
    INSERT INTO qr_tracking (donation_id, tracking_code, current_stage, stage_history, recipient_confirmation, last_updated)
    VALUES (2, 'SC-TRK-88219', 2, ?, 'Pending Assignment', CURRENT_TIMESTAMP)
    ''', (json.dumps(stage_history_2),))

    # Volunteer Tasks (with coordinates for map & smart route)
    tasks_data = [
        (
            volunteer_id, 1, 1,
            'Pick up 25 Veg Meals from Velachery and Deliver to Guindy Center',
            'both',
            'Velachery Main Road, Chennai (Near Apollo Clinic)', 12.9750, 80.2200,
            'Guindy Station Road, Chennai (Near Community Hall)', 13.0080, 80.2050,
            'urgent', 'in_progress',
            'Urgent food delivery before 8:30 PM. Recipient contact: +91 98765 43211',
            (now - timedelta(hours=2)).strftime('%Y-%m-%d %H:%M:%S'), None
        ),
        (
            None, 3, 2,
            'Deliver 45 NCERT Textbooks to Guindy Study Center',
            'delivery',
            'Guindy Industrial Estate, Chennai', 13.0067, 80.2030,
            'Saidapet Municipal Library, Chennai', 13.0210, 80.2240,
            'normal', 'available',
            'Requires small vehicle or bag with shoulder straps. Open until 6 PM.',
            None, None
        ),
        (
            volunteer_id, 4, None,
            'Stationery Kits Collection & Drop at Mylapore Orphanage',
            'pickup',
            'Mylapore Luz Corner, Chennai', 13.0368, 80.2676,
            'Adyar Youth Welfare Hub, Chennai', 13.0012, 80.2565,
            'normal', 'assigned',
            'Contact Person: Sister Maria. Call before arrival.',
            (now - timedelta(hours=1)).strftime('%Y-%m-%d %H:%M:%S'), None
        ),
        (
            volunteer_id, 8, 4,
            'CRITICAL: Emergency Drinking Water Cans to Flooded Tambaram Shelters',
            'both',
            'Tambaram Sanatorium, Chennai', 12.9249, 80.1000,
            'Tambaram West Relief Camp, Chennai', 12.9280, 80.1050,
            'emergency', 'available',
            'Emergency alert: Transport 20 water cans. Pickup vehicle with utility carrier needed.',
            None, None
        ),
        (
            volunteer_id, 6, None,
            'Hygiene Essentials Distribution at Velachery Slum Community',
            'delivery',
            'Velachery Bypass Road, Chennai', 12.9780, 80.2180,
            'Velachery Slum Clearance Board Tenements, Chennai', 12.9810, 80.2230,
            'normal', 'completed',
            'Successfully handed over 50 hygiene packs to women representatives.',
            (now - timedelta(days=1)).strftime('%Y-%m-%d %H:%M:%S'),
            (now - timedelta(days=1, hours=-2)).strftime('%Y-%m-%d %H:%M:%S')
        )
    ]

    for t in tasks_data:
        cursor.execute('''
        INSERT INTO volunteer_tasks (
            volunteer_id, donation_id, request_id, task_title, task_type,
            pickup_address, pickup_lat, pickup_lng, delivery_address, delivery_lat, delivery_lng,
            priority, status, notes, assigned_at, completed_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', t)

    # Feedback & Testimonials
    feedbacks = [
        (receiver_id, 'Murugan R.', 'receiver', 5, 'The food packets arrived hot, fresh and on time. My family was deeply touched by the kindness of the donor and the volunteer. Thank you SHARE & CARE!', 1),
        (donor_id, 'Ananya Sharma', 'donor', 5, 'Transparent QR tracking gave me real-time peace of mind knowing my surplus wedding food reached families in Velachery within 2 hours. Truly revolutionary!', 1),
        (volunteer_id, 'Karthik Raja', 'volunteer', 5, 'The smart route mapping and QR scan verification makes my delivery tasks so effortless. Proud to serve my city during weekend evenings.', 1),
        (receiver_id, 'Kavitha S.', 'receiver', 5, 'Received NCERT books and stationery kit for my 8th grade son. Saved us over ₹3,000 this school term. Bless the donors!', 1)
    ]
    cursor.executemany('''
    INSERT INTO feedback (user_id, user_name, user_role, rating, comment, is_public_testimonial)
    VALUES (?, ?, ?, ?, ?, ?)
    ''', feedbacks)

    # In-App Notifications
    notifs = [
        (donor_id, 'Donation Verified', 'Your donation "Freshly Prepared Meals (Veg Pulao)" was approved by the admin team.', 'success', 1, '/donations/1'),
        (donor_id, 'Volunteer En Route', 'Volunteer Karthik Raja has picked up your donation for delivery.', 'info', 0, '/tracking/SC-TRK-78901'),
        (receiver_id, 'Donation Matched!', 'A 95% match was found for your meal request: 25 Veg Meals in Velachery.', 'match', 0, '/receiver/dashboard'),
        (volunteer_id, 'New Task Assigned', 'You have been assigned: Pick up 25 Veg Meals from Velachery.', 'info', 0, '/volunteer/dashboard'),
        (admin_id, 'Emergency Mode Ready', 'Emergency relief protocols are configured and can be activated with one click.', 'warning', 1, '/admin/dashboard'),
        (donor_id, 'Food Rescue Alert', 'Meal donation #1 use-by time is in 5 hours. Priority dispatch is active.', 'warning', 0, '/food-rescue')
    ]
    cursor.executemany('''
    INSERT INTO notifications (user_id, title, message, type, is_read, link)
    VALUES (?, ?, ?, ?, ?, ?)
    ''', notifs)

    # Emergency Config
    cursor.execute('''
    INSERT INTO emergency_config (id, is_active, title, alert_message, affected_areas, emergency_helpline, supplies_needed)
    VALUES (1, 1, 'Chennai Coastal & Low-Lying Rain Inundation Relief Mode',
    'Severe rainfall reported in low-lying areas of Velachery, Tambaram, and Mudichur. Immediate supply of drinking water, ready-to-eat dry food, and blankets is prioritized.',
    'Velachery, Tambaram, Mudichur, Pallavaram, Saidapet',
    '+91 44 2888 8888 / Toll Free 1077',
    ?)
    ''', (json.dumps(['20L Drinking Water Cans', 'Ready-to-Eat Food Packets', 'Woolen Blankets', 'First Aid Kits', 'Mosquito Repellent Creams', 'Baby Formula Milk']),))

    # Contact Messages
    contacts = [
        ('Dr. Ramesh Sundaram', 'dr.ramesh@cityhospital.org', 'Hospital Canteen Excess Food Donation Partnership', 'We serve 400 meals daily in our hospital cafeteria and often have 30-40 hygienic untouched packed meals remaining. We would love to onboard as an institutional donor.', 'unread'),
        ('Deepa Menon', 'deepa.menon@gmail.com', 'Volunteer Group Enrollment from Anna University', 'Our NSS unit has 45 student volunteers keen on weekend delivery drives. How can we register our college chapter?', 'replied')
    ]
    cursor.executemany('''
    INSERT INTO contact_messages (name, email, subject, message, status)
    VALUES (?, ?, ?, ?, ?)
    ''', contacts)

    # Admin Audit Logs
    logs = [
        (admin_id, 'Priya Venkat', 'System Initialized', 'Database and seed records configured with standard parameters.'),
        (admin_id, 'Priya Venkat', 'Emergency Mode Activated', 'Activated Rain Inundation Relief Mode for Southern Chennai zones.'),
        (admin_id, 'Priya Venkat', 'Donation Approved', 'Approved Donation #1 (Freshly Prepared Meals) after verifying prep details.')
    ]
    cursor.executemany('''
    INSERT INTO admin_logs (admin_id, admin_name, action, details)
    VALUES (?, ?, ?, ?)
    ''', logs)

    conn.commit()
    conn.close()
    print("Database seeded with rich demo data successfully.")

if __name__ == '__main__':
    seed()
