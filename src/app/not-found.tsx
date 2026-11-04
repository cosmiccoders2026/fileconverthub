import React from "react";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <PageContainer className="text-center py-20 sm:py-28 space-y-4">
      <p className="font-mono text-sm font-semibold text-blue-600">404 Error</p>
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
        Page or Tool Not Found
      </h1>
      <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
        The requested address does not correspond to an available tool or article. Check the directory below to find the utility you need.
      </p>
      <div className="pt-4 flex justify-center gap-3">
        <Button asChild size="sm">
          <Link href="/">Return to Home</Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link href="/tools">Browse All Tools</Link>
        </Button>
      </div>
    </PageContainer>
  );
}
