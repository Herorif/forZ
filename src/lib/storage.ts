import { v4 as uuidv4 } from 'uuid';

// Data Schemas
export interface Bucket {
  bucketId: string;
  createdAt: string;
  theme: string;
  accent: string;
}

export interface Wish {
  id: string;
  bucketId: string;
  title: string;
  description: string;
  url: string | null;
  price: number | null;
  priority: number;
  status: 'planned' | 'gifted' | 'surprise';
  image: string | null;
  reactions: { [key: string]: number };
  createdAt: string;
  updatedAt: string;
}

export interface Memory {
  id: string;
  bucketId: string;
  title: string;
  caption: string | null;
  date: string;
  image: string | null;
  visibility: 'private' | 'link';
  createdAt: string;
}

export interface Message {
  id: string;
  bucketId: string;
  text: string;
  voiceUrl: string | null;
  unlockAt: string | null;
  createdAt: string;
}

export interface Milestone {
  id: string;
  bucketId: string;
  title: string;
  date: string;
  emoji: string;
  createdAt: string;
}

// Storage Adapter
const getCollection = <T>(collection: string): T[] => {
  const data = localStorage.getItem(collection);
  return data ? JSON.parse(data) : [];
};

const setCollection = <T>(collection: string, data: T[]) => {
  localStorage.setItem(collection, JSON.stringify(data));
};

export const addItem = <T extends { id: string; createdAt: string; bucketId: string }>(
  collection: string,
  item: Omit<T, 'id' | 'createdAt' | 'bucketId'>,
  bucketId: string
): T => {
  const items = getCollection<T>(collection);
  const newItem = { ...item, id: uuidv4(), createdAt: new Date().toISOString(), bucketId } as T;
  setCollection(collection, [...items, newItem]);
  return newItem;
};

export const updateItem = <T extends { id: string }>(collection: string, updatedItem: T): T => {
  const items = getCollection<T>(collection);
  const newItems = items.map(item => (item.id === updatedItem.id ? updatedItem : item));
  setCollection(collection, newItems);
  return updatedItem;
};

export const deleteItem = <T extends { id: string }>(collection: string, id: string): void => {
  const items = getCollection<T>(collection);
  const newItems = items.filter(item => item.id !== id);
  setCollection(collection, newItems);
};

export const getItemsByBucket = <T extends { bucketId: string }>(collection: string, bucketId: string): T[] => {
  const items = getCollection<T>(collection);
  return items.filter(item => item.bucketId === bucketId);
};
