// src/app/page.tsx
"use client";

import { redirect } from 'next/navigation';
import ROUTES from '@/lib/routes';

export default function HomePage() {
  redirect(ROUTES.DASHBOARD);
}