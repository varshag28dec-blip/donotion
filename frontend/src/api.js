const API_BASE = '/api';

export const getAuthToken = () => localStorage.getItem('sharecare_token');
export const setAuthToken = (token) => localStorage.setItem('sharecare_token', token);
export const removeAuthToken = () => localStorage.removeItem('sharecare_token');

export const getStoredUser = () => {
  const u = localStorage.getItem('sharecare_user');
  return u ? JSON.parse(u) : null;
};
export const setStoredUser = (user) => localStorage.setItem('sharecare_user', JSON.stringify(user));
export const removeStoredUser = () => localStorage.removeItem('sharecare_user');

async function request(endpoint, options = {}) {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...(options.headers || {})
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers
  });

  const contentType = response.headers.get('content-type');
  let data = null;
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    const errorMsg = (data && data.error) || response.statusText || 'Request failed';
    throw new Error(errorMsg);
  }

  return data;
}

export const api = {
  // Auth
  login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData) => request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  getProfile: () => request('/auth/me'),
  updateProfile: (profileData) => request('/auth/me', { method: 'PUT', body: JSON.stringify(profileData) }),

  // Donations
  getDonations: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/donations${query ? `?${query}` : ''}`);
  },
  getDonation: (id) => request(`/donations/${id}`),
  createDonation: (donationData) => request('/donations', { method: 'POST', body: JSON.stringify(donationData) }),
  updateDonation: (id, donationData) => request(`/donations/${id}`, { method: 'PUT', body: JSON.stringify(donationData) }),
  cancelDonation: (id) => request(`/donations/${id}`, { method: 'DELETE' }),
  updateDonationStatus: (id, status, reason = '') => request(`/donations/${id}/status`, { method: 'POST', body: JSON.stringify({ status, reason }) }),

  // Help Requests
  getRequests: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/requests${query ? `?${query}` : ''}`);
  },
  createRequest: (requestData) => request('/requests', { method: 'POST', body: JSON.stringify(requestData) }),
  updateRequestStatus: (id, status) => request(`/requests/${id}/status`, { method: 'POST', body: JSON.stringify({ status }) }),

  // Smart Matching
  getMatches: () => request('/matches'),
  claimMatch: (donationId, requestId) => request('/matches/request', { method: 'POST', body: JSON.stringify({ donation_id: donationId, request_id: requestId }) }),

  // Share Basket
  getBaskets: () => request('/baskets'),
  createBasket: (basketData) => request('/baskets', { method: 'POST', body: JSON.stringify(basketData) }),
  contributeBasket: (basketId, contribution) => request(`/baskets/${basketId}/contribute`, { method: 'POST', body: JSON.stringify(contribution) }),

  // Food Rescue
  getFoodRescue: () => request('/food-rescue'),

  // QR Tracking
  getTracking: (code) => request(`/tracking/${code}`),
  updateTrackingStage: (code, stage, note = '') => request(`/tracking/${code}/update-stage`, { method: 'POST', body: JSON.stringify({ stage, note }) }),

  // Volunteer
  getVolunteerTasks: (filter = 'all') => request(`/volunteer/tasks?filter=${filter}`),
  acceptVolunteerTask: (taskId) => request(`/volunteer/tasks/${taskId}/accept`, { method: 'POST' }),
  updateTaskStatus: (taskId, status) => request(`/volunteer/tasks/${taskId}/status`, { method: 'POST', body: JSON.stringify({ status }) }),
  getVolunteerRoute: () => request('/volunteer/route'),

  // Kits
  getKits: () => request('/kits'),
  contributeKit: (kitId, itemIndex, quantity = 1) => request(`/kits/${kitId}/contribute`, { method: 'POST', body: JSON.stringify({ item_index: itemIndex, quantity }) }),

  // Emergency
  getEmergency: () => request('/emergency'),
  toggleEmergency: (config) => request('/emergency/toggle', { method: 'POST', body: JSON.stringify(config) }),

  // Impact & Analytics
  getImpactStats: () => request('/impact/stats'),
  getAdminAnalytics: () => request('/admin/analytics'),
  getAdminUsers: () => request('/admin/users'),
  updateUserRole: (userId, role) => request(`/admin/users/${userId}/role`, { method: 'POST', body: JSON.stringify({ role }) }),

  // Notifications
  getNotifications: () => request('/notifications'),
  markNotificationRead: (id) => request(`/notifications/${id}/read`, { method: 'POST' }),
  markAllNotificationsRead: () => request('/notifications/read-all', { method: 'POST' }),

  // Feedback & Contact
  getFeedback: () => request('/feedback'),
  submitFeedback: (feedbackData) => request('/feedback', { method: 'POST', body: JSON.stringify(feedbackData) }),
  sendContactMessage: (contactData) => request('/contact', { method: 'POST', body: JSON.stringify(contactData) }),
  getContactMessages: () => request('/contact'),
};
