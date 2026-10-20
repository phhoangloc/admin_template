import * as data from './data';
import type { EntityConfig } from './types';

const TODAY = 'Sep 4, 2026';

export const userConfig: EntityConfig = {
  rows: data.users,
  title: 'User Archive',
  singular: 'User',
  columns: [
    { key: 'name', label: 'Name', width: '2fr', bold: true },
    { key: 'email', label: 'Email', width: '2fr', muted: true },
    { key: 'role', label: 'Role', width: '1.2fr' },
    { key: 'joined', label: 'Joined', width: '1.2fr', muted: true },
    { key: 'status', label: 'Status', width: '1fr', badge: true },
  ],
  fields: [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role', type: 'select', options: ['Customer', 'Staff', 'Admin'] },
    { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive', 'Suspended'] },
  ],
  blank: { name: '', email: '', role: 'Customer', status: 'Active' },
  saveDefaults: { joined: TODAY },
  avatarHeader: true,
};

export const itemConfig: EntityConfig = {
  rows: data.items,
  title: 'Item Archive',
  singular: 'Item',
  columns: [
    { key: 'name', label: 'Item', width: '2.5fr', bold: true, cover: true },
    { key: 'category', label: 'Category', width: '1.5fr', muted: true },
    { key: 'price', label: 'Price', width: '1fr' },
    { key: 'status', label: 'Status', width: '1fr', badge: true },
  ],
  fields: [
    { key: 'cover', label: 'Cover', type: 'cover' },
    { key: 'name', label: 'Item Name' },
    { key: 'category', label: 'Category', type: 'select', options: ['Main', 'Drink', 'Dessert'] },
    { key: 'price', label: 'Price', placeholder: '$0.00' },
    { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Draft', 'Archived'] },
    { key: 'detail', label: 'Detail', type: 'richtext', placeholder: 'Describe the item: ingredients, size, notes…' },
  ],
  blank: { name: '', category: 'Main', price: '', status: 'Active', cover: '', detail: '' },
};

export const orderConfig: EntityConfig = {
  rows: data.orders,
  title: 'Orders',
  singular: 'Order',
  columns: [
    { key: 'id', label: 'Order', width: '0.8fr', bold: true },
    { key: 'customer', label: 'Customer', width: '1.6fr', bold: true },
    { key: 'items', label: 'Items', width: '2.4fr', muted: true },
    { key: 'total', label: 'Total', width: '1fr' },
    { key: 'status', label: 'Status', width: '1fr', badge: true },
    { key: 'date', label: 'Date', width: '1.1fr', muted: true, format: 'date' },
  ],
  fields: [
    { key: 'customer', label: 'Customer' },
    { key: 'items', label: 'Items', placeholder: 'e.g. Cheese Burger ×2, Iced Americano' },
    { key: 'total', label: 'Total', placeholder: '$0.00' },
    { key: 'status', label: 'Status', type: 'select', options: ['Pending', 'Completed', 'Cancelled'] },
    { key: 'date', label: 'Date', type: 'date' },
  ],
  blank: { id: '', customer: '', items: '', total: '', status: 'Pending', date: '' },
  dateDefaults: { date: 0 },
  autoNumber: { key: 'id' },
};

export const invoiceConfig: EntityConfig = {
  rows: data.invoices,
  title: 'Invoices',
  singular: 'Invoice',
  columns: [
    { key: 'id', label: 'Invoice', width: '1fr', bold: true },
    { key: 'customer', label: 'Customer', width: '2fr', bold: true },
    { key: 'issued', label: 'Issued', width: '1.1fr', muted: true, format: 'date' },
    { key: 'due', label: 'Due', width: '1.1fr', muted: true, format: 'date' },
    { key: 'amount', label: 'Amount', width: '1.1fr' },
    { key: 'status', label: 'Status', width: '1fr', badge: true },
  ],
  fields: [
    { key: 'customer', label: 'Customer' },
    { key: 'amount', label: 'Amount', placeholder: '$0.00' },
    { key: 'issued', label: 'Issue date', type: 'date' },
    { key: 'due', label: 'Due date', type: 'date' },
    { key: 'status', label: 'Status', type: 'select', options: ['Draft', 'Unpaid', 'Paid', 'Overdue'] },
  ],
  blank: { id: '', customer: '', amount: '', issued: '', due: '', status: 'Draft' },
  dateDefaults: { issued: 0, due: 14 },
  autoNumber: { key: 'id' },
};

export const fileConfig: EntityConfig = {
  rows: data.files,
  title: 'File Archive',
  singular: 'File',
  columns: [
    { key: 'name', label: 'File Name', width: '2.5fr', bold: true, thumb: true },
    { key: 'type', label: 'Type', width: '1fr', muted: true },
    { key: 'size', label: 'Size', width: '1fr', muted: true },
    { key: 'updated', label: 'Updated', width: '1.2fr', muted: true },
  ],
  fields: [
    { key: 'upload', label: 'Upload File', type: 'file' },
    { key: 'name', label: 'File Name' },
  ],
  blank: { name: '', type: 'File', size: '' },
  uploadOnNew: true,
  rowAction: 'delete',
  saveDefaults: { updated: TODAY },
};

export const calendarConfig: EntityConfig = {
  rows: data.events,
  title: 'Calendar Archive',
  singular: 'Event',
  columns: [
    { key: 'title', label: 'Event', width: '2.5fr', bold: true },
    { key: 'date', label: 'Date', width: '1.2fr', muted: true },
    { key: 'time', label: 'Time', width: '1fr', muted: true },
  ],
  fields: [
    { key: 'title', label: 'Event Title' },
    { key: 'date', label: 'Date', type: 'date' },
    { key: 'time', label: 'Time', type: 'time' },
  ],
  blank: { title: '', date: '', time: '09:00' },
};
