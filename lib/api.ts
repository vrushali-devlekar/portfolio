import { CaseStudy, caseStudies } from "./caseStudies";

// Simulate network latency for demonstration of TanStack Query loading/skeleton states
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchProjects(): Promise<CaseStudy[]> {
  await delay(800); // 800ms latency simulation
  return caseStudies;
}

export async function fetchProjectBySlug(slug: string): Promise<CaseStudy | undefined> {
  await delay(400); // 400ms latency simulation
  return caseStudies.find((p) => p.slug === slug);
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export async function submitContactForm(payload: ContactPayload): Promise<ContactResponse> {
  // Simulate API latency
  await delay(1200);

  try {
    const response = await fetch("https://formsubmit.co/ajax/vrushali.devlekar@gmail.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    
    if (response.ok && (result.success === "true" || result.success === true)) {
      return { success: true, message: "Message sent successfully!" };
    } else {
      return { success: false, message: result.message || "Failed to submit. Please try again." };
    }
  } catch (error) {
    return { success: false, message: "A network error occurred. Please try again later." };
  }
}
