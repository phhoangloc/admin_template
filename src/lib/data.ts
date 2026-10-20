import type { Row } from './types';

export const users: Row[] = [
  { name: 'Sarah Nguyen', email: 's.nguyen@mail.com', role: 'Customer', joined: 'Jan 12, 2025', status: 'Active' },
  { name: 'James Tran', email: 'j.tran@mail.com', role: 'Customer', joined: 'Feb 3, 2025', status: 'Active' },
  { name: 'Linh Pham', email: 'l.pham@mail.com', role: 'Staff', joined: 'Mar 20, 2025', status: 'Active' },
  { name: 'David Oshodi', email: 'd.oshodi@mail.com', role: 'Customer', joined: 'May 8, 2025', status: 'Suspended' },
  { name: 'Emma Vo', email: 'e.vo@mail.com', role: 'Customer', joined: 'Jun 30, 2025', status: 'Active' },
  { name: 'Alexandra Deff', email: 'a.deff@mail.com', role: 'Staff', joined: 'Jul 15, 2025', status: 'Inactive' },
];

export const items: Row[] = [
  {
    name: 'Cheese Burger', category: 'Main', price: '$8.50', status: 'Active', cover: '/photo-dishes.svg',
    detail: '<h3>Cheese Burger</h3><p>A <b>juicy beef patty</b> with melted cheddar, pickles and house sauce on a toasted bun.</p><ul><li>Beef 150g</li><li>Cheddar, lettuce, tomato</li><li>Served with fries</li></ul>',
  },
  { name: 'Iced Americano', category: 'Drink', price: '$4.20', status: 'Active' },
  { name: 'Matcha Latte', category: 'Drink', price: '$5.00', status: 'Active' },
  { name: 'Fried Chicken Rice', category: 'Main', price: '$9.80', status: 'Active' },
  { name: 'Fruit Salad', category: 'Dessert', price: '$4.90', status: 'Archived' },
  { name: 'Beef Tacos', category: 'Main', price: '$7.60', status: 'Draft' },
];

export type MailFolder = 'inbox' | 'sent' | 'drafts' | 'trash';

export interface Mail {
  id: string;
  folder: MailFolder;
  name: string; // sender (inbox) or recipient (sent) display name
  email: string;
  subject: string;
  body: string; // HTML
  time: string;
  read: boolean;
  starred: boolean;
}

export const mails: Mail[] = [
  {
    id: 'm1', folder: 'inbox', name: 'Arc Company', email: 'billing@arc-supply.com', time: '9:40 AM', read: false, starred: true,
    subject: 'Invoice 09 — September deliveries',
    body: '<p>Hello Michael,</p><p>Please find the invoice for September deliveries below.</p><ul><li>Beef patties — 120 kg</li><li>Cheddar slices — 40 kg</li><li>Oat milk — 60 L</li></ul><p>Payment is due within 14 days. Let us know if anything looks off.</p><p>Best,<br>Arc Billing</p>',
  },
  {
    id: 'm2', folder: 'inbox', name: 'Sarah Nguyen', email: 's.nguyen@mail.com', time: '8:15 AM', read: false, starred: false,
    subject: 'Pre-order for tomorrow',
    body: '<p>Hi!</p><p>Could I pre-order <b>two Matcha Lattes</b> with oat milk for pick-up around 10 AM tomorrow?</p><p>Thanks,<br>Sarah</p>',
  },
  {
    id: 'm3', folder: 'inbox', name: 'Linh Pham', email: 'l.pham@mail.com', time: 'Yesterday', read: true, starred: false,
    subject: 'Shift swap request',
    body: '<p>Hi Michael,</p><p>Can I swap my Saturday shift with Emma? She already agreed.</p><p>Linh</p>',
  },
  {
    id: 'm4', folder: 'inbox', name: 'City Health Dept.', email: 'inspections@city.gov', time: 'Mon', read: true, starred: true,
    subject: 'Inspection scheduled for Oct 20',
    body: '<h3>Routine inspection</h3><p>A routine food-safety inspection is scheduled for <b>October 20, 5:00 PM</b>. Please keep temperature logs and allergen records available.</p>',
  },
  {
    id: 'm5', folder: 'inbox', name: 'Projek Team', email: 'team@projek.io', time: 'Oct 12', read: true, starred: false,
    subject: 'Welcome to the new admin',
    body: '<p>Your admin workspace is ready. Use <b>Settings</b> to pick a theme, font and accent color.</p>',
  },
  {
    id: 'm6', folder: 'sent', name: 'James Tran', email: 'j.tran@mail.com', time: 'Yesterday', read: true, starred: false,
    subject: 'Catering quote for Friday',
    body: '<p>Hi James,</p><p>Your updated total for Friday is <b>$342</b>. Let me know if you want to add anything.</p><p>Michael</p>',
  },
  {
    id: 'm7', folder: 'drafts', name: 'Arc Company', email: 'billing@arc-supply.com', time: 'Oct 15', read: true, starred: false,
    subject: 'Re: Invoice 08',
    body: '<p>Thanks — we will confirm payment by…</p>',
  },
  {
    id: 'm8', folder: 'trash', name: 'Promo Deals', email: 'deals@promo-mail.biz', time: 'Oct 3', read: true, starred: false,
    subject: '50% off kitchen gadgets!',
    body: '<p>Limited time offer. Click now!</p>',
  },
];

export interface ChatMessage {
  from: 'me' | 'them';
  text: string;
  time: string;
}

export interface Conversation {
  id: string;
  name: string;
  initials: string;
  color: string;
  unread: number;
  messages: ChatMessage[];
}

export const conversations: Conversation[] = [
  {
    id: 'sarah', name: 'Sarah Nguyen', initials: 'SN', color: 'oklch(0.62 0.14 25)', unread: 2,
    messages: [
      { from: 'them', text: 'Hi! Is the Matcha Latte available for pre-order tomorrow?', time: '9:12 AM' },
      { from: 'me', text: 'Hi Sarah, yes — we open at 8:00. Want me to reserve one?', time: '9:15 AM' },
      { from: 'them', text: 'Yes please, two of them. Also, do you have oat milk?', time: '9:20 AM' },
      { from: 'them', text: 'And can I pick up around 10?', time: '9:21 AM' },
    ],
  },
  {
    id: 'james', name: 'James Tran', initials: 'JT', color: 'oklch(0.6 0.1 230)', unread: 0,
    messages: [
      { from: 'me', text: 'Your catering quote for Friday is ready.', time: 'Yesterday' },
      { from: 'them', text: 'Thanks! Can we add 10 more Cheese Burgers?', time: 'Yesterday' },
      { from: 'me', text: 'Sure, updated total is $342.', time: 'Yesterday' },
    ],
  },
  {
    id: 'linh', name: 'Linh Pham', initials: 'LP', color: 'oklch(0.6 0.1 300)', unread: 1,
    messages: [
      { from: 'them', text: 'Can I swap my shift on Saturday with Emma?', time: 'Mon' },
    ],
  },
  {
    id: 'supplier', name: 'Arc Company', initials: 'AC', color: 'oklch(0.6 0.13 155)', unread: 0,
    messages: [
      { from: 'them', text: 'Invoice 08 has been issued, please confirm receipt.', time: 'Aug 29' },
      { from: 'me', text: 'Received, thank you. We will pay by Friday.', time: 'Aug 29' },
    ],
  },
];

export const orders: Row[] = [
  { id: '#1042', customer: 'Sarah Nguyen', items: 'Matcha Latte ×2, Fruit Salad', total: '$14.90', status: 'Pending', date: '2026-10-20' },
  { id: '#1041', customer: 'James Tran', items: 'Cheese Burger ×10', total: '$85.00', status: 'Pending', date: '2026-10-20' },
  { id: '#1040', customer: 'Linh Pham', items: 'Iced Americano, Beef Tacos', total: '$11.80', status: 'Completed', date: '2026-10-20' },
  { id: '#1039', customer: 'Emma Vo', items: 'Fried Chicken Rice ×2', total: '$19.60', status: 'Completed', date: '2026-10-19' },
  { id: '#1038', customer: 'David Oshodi', items: 'Cheese Burger, Iced Americano', total: '$12.70', status: 'Cancelled', date: '2026-10-19' },
  { id: '#1037', customer: 'Alexandra Deff', items: 'Matcha Latte', total: '$5.00', status: 'Completed', date: '2026-10-19' },
  { id: '#1036', customer: 'Sarah Nguyen', items: 'Fruit Salad ×3', total: '$14.70', status: 'Completed', date: '2026-10-18' },
  { id: '#1035', customer: 'James Tran', items: 'Beef Tacos ×4, Iced Americano ×4', total: '$47.20', status: 'Completed', date: '2026-10-18' },
  { id: '#1034', customer: 'Isaac Oluwatemilorun', items: 'Cheese Burger ×2', total: '$17.00', status: 'Completed', date: '2026-10-17' },
  { id: '#1033', customer: 'Linh Pham', items: 'Matcha Latte ×2', total: '$10.00', status: 'Completed', date: '2026-10-17' },
  { id: '#1032', customer: 'Emma Vo', items: 'Fried Chicken Rice, Matcha Latte', total: '$14.80', status: 'Cancelled', date: '2026-10-16' },
  { id: '#1031', customer: 'David Oshodi', items: 'Cheese Burger ×3', total: '$25.50', status: 'Completed', date: '2026-10-16' },
  { id: '#1030', customer: 'Sarah Nguyen', items: 'Iced Americano ×2', total: '$8.40', status: 'Completed', date: '2026-10-15' },
  { id: '#1029', customer: 'James Tran', items: 'Fried Chicken Rice ×5', total: '$49.00', status: 'Completed', date: '2026-10-15' },
  { id: '#1028', customer: 'Alexandra Deff', items: 'Beef Tacos', total: '$7.60', status: 'Completed', date: '2026-10-14' },
  { id: '#1027', customer: 'Linh Pham', items: 'Fruit Salad, Matcha Latte', total: '$9.90', status: 'Completed', date: '2026-10-14' },
  { id: '#1026', customer: 'Emma Vo', items: 'Cheese Burger, Fruit Salad', total: '$13.40', status: 'Completed', date: '2026-10-13' },
  { id: '#1025', customer: 'Isaac Oluwatemilorun', items: 'Iced Americano ×3', total: '$12.60', status: 'Completed', date: '2026-10-13' },
  { id: '#1024', customer: 'Sarah Nguyen', items: 'Matcha Latte, Beef Tacos', total: '$12.60', status: 'Completed', date: '2026-10-12' },
  { id: '#1023', customer: 'David Oshodi', items: 'Fried Chicken Rice', total: '$9.80', status: 'Cancelled', date: '2026-10-12' },
  { id: '#1022', customer: 'James Tran', items: 'Cheese Burger ×4', total: '$34.00', status: 'Completed', date: '2026-10-11' },
  { id: '#1021', customer: 'Linh Pham', items: 'Iced Americano, Fruit Salad', total: '$9.10', status: 'Completed', date: '2026-10-11' },
];

export const invoices: Row[] = [
  { id: 'INV-0021', customer: 'Arc Company', issued: '2026-10-14', due: '2026-10-28', amount: '$2,480.00', status: 'Unpaid' },
  { id: 'INV-0020', customer: 'James Tran (catering)', issued: '2026-10-09', due: '2026-10-23', amount: '$342.00', status: 'Unpaid' },
  { id: 'INV-0019', customer: 'Northside Office Park', issued: '2026-10-02', due: '2026-10-16', amount: '$1,120.00', status: 'Overdue' },
  { id: 'INV-0018', customer: 'Arc Company', issued: '2026-09-14', due: '2026-09-28', amount: '$2,310.50', status: 'Paid' },
  { id: 'INV-0017', customer: 'Green Leaf Events', issued: '2026-09-10', due: '2026-09-24', amount: '$860.00', status: 'Paid' },
  { id: 'INV-0016', customer: 'Sarah Nguyen (catering)', issued: '2026-09-05', due: '2026-09-19', amount: '$215.00', status: 'Paid' },
  { id: 'INV-0015', customer: 'Northside Office Park', issued: '2026-09-02', due: '2026-09-16', amount: '$1,090.00', status: 'Paid' },
  { id: 'INV-0014', customer: 'City Library Cafe', issued: '2026-08-28', due: '2026-09-11', amount: '$640.00', status: 'Overdue' },
  { id: 'INV-0013', customer: 'Arc Company', issued: '2026-08-14', due: '2026-08-28', amount: '$2,205.00', status: 'Paid' },
  { id: 'INV-0012', customer: 'Green Leaf Events', issued: '2026-08-08', due: '2026-08-22', amount: '$1,450.00', status: 'Paid' },
  { id: 'INV-0011', customer: 'Linh Pham (catering)', issued: '2026-08-01', due: '2026-08-15', amount: '$180.00', status: 'Paid' },
  { id: 'INV-0022', customer: 'Harbor Hotel', issued: '2026-10-20', due: '2026-11-03', amount: '$3,900.00', status: 'Draft' },
];

export const files: Row[] = [
  { name: 'Menu_Q3_2026.pdf', type: 'PDF', size: '2.1 MB', updated: 'Sep 1, 2026' },
  { name: 'Supplier_Invoice_08.xlsx', type: 'Excel', size: '640 KB', updated: 'Aug 29, 2026' },
  { name: 'Staff_Schedule.pdf', type: 'PDF', size: '310 KB', updated: 'Aug 26, 2026' },
  { name: 'Store_Photo_Front.jpg', type: 'Image', size: '4.4 MB', updated: 'Aug 20, 2026', preview: '/store-photo.svg' },
  { name: 'Tax_Report_July.pdf', type: 'PDF', size: '1.2 MB', updated: 'Aug 5, 2026' },
  { name: 'Loyalty_Terms.docx', type: 'Word', size: '88 KB', updated: 'Jul 22, 2026' },
  { name: 'Interior_Layout.jpg', type: 'Image', size: '3.1 MB', updated: 'Jul 18, 2026', preview: '/photo-interior.svg' },
  { name: 'Payroll_June.xlsx', type: 'Excel', size: '512 KB', updated: 'Jul 10, 2026' },
  { name: 'Health_Inspection.pdf', type: 'PDF', size: '1.8 MB', updated: 'Jul 3, 2026' },
  { name: 'Hiring_Policy.docx', type: 'Word', size: '120 KB', updated: 'Jun 28, 2026' },
  { name: 'Signature_Dishes.png', type: 'Image', size: '5.2 MB', updated: 'Jun 21, 2026', preview: '/photo-dishes.svg' },
  { name: 'Inventory_Q2.xlsx', type: 'Excel', size: '890 KB', updated: 'Jun 15, 2026' },
  { name: 'Supplier_Contract_Arc.pdf', type: 'PDF', size: '2.7 MB', updated: 'Jun 9, 2026' },
  { name: 'Staff_Handbook.docx', type: 'Word', size: '310 KB', updated: 'Jun 2, 2026' },
  { name: 'Logo_Primary.png', type: 'Image', size: '240 KB', updated: 'May 27, 2026', preview: '/photo-logo.svg' },
  { name: 'Sales_May.xlsx', type: 'Excel', size: '705 KB', updated: 'May 20, 2026' },
  { name: 'Insurance_Policy.pdf', type: 'PDF', size: '1.5 MB', updated: 'May 14, 2026' },
  { name: 'Promo_Flyer.pdf', type: 'PDF', size: '3.4 MB', updated: 'May 8, 2026' },
  { name: 'Kitchen_Setup.jpg', type: 'Image', size: '4.0 MB', updated: 'May 2, 2026', preview: '/store-photo.svg' },
  { name: 'Allergen_Guide.docx', type: 'Word', size: '64 KB', updated: 'Apr 25, 2026' },
  { name: 'Expense_Report_April.xlsx', type: 'Excel', size: '430 KB', updated: 'Apr 19, 2026' },
  { name: 'Lease_Agreement.pdf', type: 'PDF', size: '2.2 MB', updated: 'Apr 11, 2026' },
  { name: 'Brand_Guidelines.pdf', type: 'PDF', size: '6.8 MB', updated: 'Apr 4, 2026' },
  { name: 'Delivery_Routes.xlsx', type: 'Excel', size: '210 KB', updated: 'Mar 29, 2026' },
  { name: 'Opening_Day.jpg', type: 'Image', size: '3.6 MB', updated: 'Mar 20, 2026', preview: '/photo-interior.svg' },
  { name: 'Training_Notes.docx', type: 'Word', size: '45 KB', updated: 'Mar 12, 2026' },
  { name: 'Tax_Report_Q1.pdf', type: 'PDF', size: '1.1 MB', updated: 'Mar 3, 2026' },
  { name: 'Customer_Survey.xlsx', type: 'Excel', size: '960 KB', updated: 'Feb 22, 2026' },
  { name: 'Catering_Menu.pdf', type: 'PDF', size: '2.9 MB', updated: 'Feb 14, 2026' },
  { name: 'Press_Release.docx', type: 'Word', size: '72 KB', updated: 'Feb 6, 2026' },
];

export const events: Row[] = [
  // date: YYYY-MM-DD, time: 24h HH:MM
  { title: 'Monthly Inventory Check', date: '2026-10-01', time: '09:00' },
  { title: 'Supplier Call', date: '2026-10-06', time: '11:00' },
  { title: 'Marketing Sync', date: '2026-10-06', time: '16:00' },
  { title: 'Menu Tasting Review', date: '2026-10-13', time: '15:30' },
  { title: 'Staff Training Session', date: '2026-10-20', time: '10:00' },
  { title: 'Meeting with Arc Company', date: '2026-10-20', time: '14:00' },
  { title: 'Health Inspection', date: '2026-10-20', time: '17:00' },
  { title: 'Payroll Review', date: '2026-10-20', time: '18:00' },
  { title: 'New Menu Launch', date: '2026-10-27', time: '08:00' },
  { title: 'Halloween Promo', date: '2026-10-31', time: '12:00' },
  { title: 'Quarterly Planning', date: '2026-11-03', time: '10:00' },
  { title: 'Staff Training Session', date: '2026-09-24', time: '10:00' },
  { title: 'Meeting with Arc Company', date: '2026-09-04', time: '14:00' },
  { title: 'Menu Tasting Review', date: '2026-08-18', time: '15:30' },
  { title: 'Supplier Call', date: '2026-08-12', time: '11:00' },
];

