import React, { useMemo } from 'react';
import { RouterProvider, useNavigation } from '@/lib/router-context';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

import HomePage from '@/app/page';
import AllToolsPage from '@/app/tools/page';
import ToolDetailPage from '@/components/pages/tool-detail-page';
import PdfToolsPage from '@/app/pdf-tools/page';
import ImageToolsPage from '@/app/image-tools/page';
import TextToolsPage from '@/app/text-tools/page';
import BlogIndexPage from '@/app/blog/page';
import BlogDetailPage from '@/components/pages/blog-detail-page';
import AboutPage from '@/app/about/page';
import ContactPage from '@/app/contact/page';
import TermsPage from '@/app/terms/page';
import PrivacyPage from '@/app/privacy/page';
import DisclaimerPage from '@/app/disclaimer/page';
import NotFoundPage from '@/app/not-found';

function MainRouter() {
  const { pathname } = useNavigation();

  const content = useMemo(() => {
    // Normalise pathname
    const cleanPath = pathname.replace(/\/+$/, '') || '/';

    if (cleanPath === '/') {
      return <HomePage />;
    }

    if (cleanPath === '/tools') {
      return <AllToolsPage />;
    }

    if (cleanPath.startsWith('/tools/')) {
      const slug = cleanPath.slice('/tools/'.length);
      return <ToolDetailPage slug={slug} />;
    }

    if (cleanPath === '/pdf-tools') {
      return <PdfToolsPage />;
    }

    if (cleanPath === '/image-tools') {
      return <ImageToolsPage />;
    }

    if (cleanPath === '/text-tools') {
      return <TextToolsPage />;
    }

    if (cleanPath === '/blog') {
      return <BlogIndexPage />;
    }

    if (cleanPath.startsWith('/blog/')) {
      const slug = cleanPath.slice('/blog/'.length);
      return <BlogDetailPage slug={slug} />;
    }

    if (cleanPath === '/about') {
      return <AboutPage />;
    }

    if (cleanPath === '/contact') {
      return <ContactPage />;
    }

    if (cleanPath === '/terms') {
      return <TermsPage />;
    }

    if (cleanPath === '/privacy') {
      return <PrivacyPage />;
    }

    if (cleanPath === '/disclaimer') {
      return <DisclaimerPage />;
    }

    return <NotFoundPage />;
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans antialiased">
      <Navbar />
      <main className="flex-1">{content}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <MainRouter />
    </RouterProvider>
  );
}
