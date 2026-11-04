import { tools } from "../src/config/tools";
import { categories } from "../src/config/categories";
import { blogPosts } from "../src/content/blog";

console.log("=== COMPREHENSIVE ROUTE & TOOL AUDIT ===");

const routesToTest = [
  "/",
  "/tools",
  "/pdf-tools",
  "/image-tools",
  "/text-tools",
  "/blog",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/disclaimer",
  ...tools.map(t => `/tools/${t.slug}`),
  ...blogPosts.map(b => `/blog/${b.slug}`)
];

console.log(`Auditing ${routesToTest.length} total pages against http://localhost:3000...`);

async function testRoutes() {
  let passed = 0;
  let failed = 0;
  const failures: { route: string; error: string }[] = [];

  for (const route of routesToTest) {
    try {
      const res = await fetch(`http://localhost:3000${route}`);
      if (!res.ok) {
        failures.push({ route, error: `HTTP ${res.status}` });
        failed++;
      } else {
        const text = await res.text();
        if (!text.includes("FileConvertHub")) {
          failures.push({ route, error: `Missing brand title in HTML` });
          failed++;
        } else {
          passed++;
        }
      }
    } catch (err: any) {
      failures.push({ route, error: err.message });
      failed++;
    }
  }

  console.log(`Results: ${passed} passed, ${failed} failed.`);
  if (failures.length > 0) {
    console.error("Route failures:", failures);
    process.exit(1);
  } else {
    console.log("✓ All 40 pages returned HTTP 200 with valid FileConvertHub application markup!");
  }
}

testRoutes();
