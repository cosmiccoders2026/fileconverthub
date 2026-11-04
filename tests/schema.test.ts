import {
  websiteSchema,
  organizationSchema,
  breadcrumbSchema,
  faqSchema,
  articleSchema,
  webApplicationSchema,
} from "../src/lib/schema";

console.log("=== TESTING SCHEMA.ORG STRUCTURED DATA GENERATORS ===");

const web = websiteSchema();
if (web["@type"] !== "WebSite" || !web.name || !web.url) {
  throw new Error("Invalid WebSite schema");
}
console.log("✓ websiteSchema valid");

const org = organizationSchema();
if (org["@type"] !== "Organization" || !org.name || !org.email) {
  throw new Error("Invalid Organization schema");
}
console.log("✓ organizationSchema valid");

const bread = breadcrumbSchema([
  { name: "Home", url: "https://fileconverthub.vercel.app" },
  { name: "PDF Tools", url: "https://fileconverthub.vercel.app/pdf-tools" },
]);
if (bread["@type"] !== "BreadcrumbList" || bread.itemListElement.length !== 2) {
  throw new Error("Invalid Breadcrumb schema");
}
console.log("✓ breadcrumbSchema valid");

const faq = faqSchema([
  { question: "Is it free?", answer: "Yes." },
]);
if (faq["@type"] !== "FAQPage" || faq.mainEntity.length !== 1) {
  throw new Error("Invalid FAQ schema");
}
console.log("✓ faqSchema valid");

const app = webApplicationSchema({
  name: "Merge PDF",
  description: "Combine PDFs",
  url: "https://fileconverthub.vercel.app/tools/merge-pdf",
});
if (app["@type"] !== "WebApplication" || !app.offers) {
  throw new Error("Invalid WebApplication schema");
}
console.log("✓ webApplicationSchema valid");

console.log("ALL SCHEMA VALIDATIONS PASSED! ✓");
