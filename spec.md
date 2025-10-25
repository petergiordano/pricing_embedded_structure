
-----

## Comprehensive Specification for Refactoring PricingCalculator.tsx

**Objective:**
Refactor the existing `PricingCalculator.tsx` component to implement the new Layer 1 diagnostic as per the "Pricing Fundamentals (with AI)" document. This involves guiding users through selecting Problem Characteristics (`Frequency/Continuity` and `Criticality/Impact`), determining the appropriate **Core Pricing Architecture** for B2B SaaS, and presenting the recommendation with updated UI and logic.

**Core Principles:**

1.  **Strict Adherence to Brand Guidelines:** Use *only* the Scale Venture Partners color palette and design guidelines specified in the file: specs/scalevp_branding_guidelines.md
2.  **Fonts:** Use "Work Sans" and "Outfit" for typography. Maintain clean, uncluttered layouts and strong visual hierarchy.
3.  **SaaS-Centric Logic:** The new diagnostic must align with scalable B2B SaaS recurring revenue models. Explicitly eliminate "Fixed Fee" as a recommendation.
4.  **Refactor, Don't Rewrite:** Reuse and extend existing React component structure, Tailwind CSS classes, and utility functions (`cn`). Avoid introducing new CSS files or extensive inline styles unless absolutely necessary.
5.  **Clarity & User Journey:** Ensure clear messaging, updated terminology, and a seamless user flow that leads to Layer 2.

-----

### 1\. Data Structure Updates (within `PricingCalculator.tsx`)

**A. `frequencyPatterns` Array:**

  * Update `id`, `title`, `subtitle`, `description`, and `icon` for each object.

  * **Remove** the `recommendation` property from all objects in this array.

    ```typescript
    const frequencyPatterns = [
      {
        id: 'continuous',
        title: 'Continuous Problems',
        subtitle: '(Always Present)',
        description: 'The customer\'s need is constant and ongoing (e.g., data security, system monitoring, always-on communication).',
        icon: Clock, // Assuming Clock is an imported icon component
      },
      {
        id: 'burst_episodic',
        title: 'Burst / Episodic Problems',
        subtitle: '(Intense Periods)',
        description: 'The need spikes during specific events or cycles (e.g., campaign launches, quarterly reporting, seasonal compliance).',
        icon: Zap, // Assuming Zap is an imported icon component
      },
      {
        id: 'project_oriented',
        title: 'Project-Oriented Problems',
        subtitle: '(Defined Beginning/End, SaaS Context)',
        description: 'While some solutions address "projects," for B2B SaaS this often resolves into Usage-Based (resources consumed) or Time-Based Subscription (access duration). A truly one-time transaction is usually a service, not SaaS.',
        icon: Target, // Assuming Target is an imported icon component
      },
    ];
    ```

**B. `criticalityPatterns` Array:**

  * Update `id`, `title`, `description`, and `icon` for each object.

  * **Remove** the `recommendation` property from all objects in this array.

    ```typescript
    const criticalityPatterns = [
      {
        id: 'mission_critical',
        title: 'Mission-Critical / Revenue-Protecting',
        description: 'Directly impacts revenue, prevents significant losses, or enables core business functions.',
        icon: Shield, // Assuming Shield is an imported icon component
      },
      {
        id: 'efficiency',
        title: 'Efficiency / Productivity Enhancing',
        description: 'Improves workflows, saves time, or reduces operational costs.',
        icon: Settings, // Assuming Settings is an imported icon component
      },
      {
        id: 'nice_to_have',
        title: 'Nice-to-Have / Strategic Enhancement',
        description: 'Provides additional benefits, improves experience, or supports future strategy but isn\'t immediately critical.',
        icon: Heart, // Assuming Heart is an imported icon component
      },
    ];
    ```

**C. State Interface (`CalculatorState`):**

  * Ensure state variables (`selectedFrequencyId`, `selectedCriticalityId`) correctly store the updated `id` strings.

-----

### 2\. Recommendation Logic Update (`generateRecommendation` function)

**A. Input:** Function signature remains `generateRecommendation(frequencyId: string, criticalityId: string)`.

**B. Output Interface (`PricingRecommendation`):**

  * Modify to only include `coreArchitecture`, `reasoning`, and `examples`.
    ```typescript
    interface PricingRecommendation {
      coreArchitecture: string;
      reasoning: string;
      examples: string[];
    }
    ```

**C. Core Logic:** Implement the following mapping from `frequencyId` and `criticalityId` to `coreArchitecture`, `reasoning`, and `examples`. **No "Fixed Fee" recommendation allowed.**

````
```typescript
function generateRecommendation(frequencyId: string, criticalityId: string): PricingRecommendation {
    let coreArchitecture: string = '';
    let reasoning: string = '';
    let examples: string[] = [];

    // --- Logic Mapping ---

    if (criticalityId === 'mission_critical') {
        if (frequencyId === 'continuous') {
            coreArchitecture = 'Primarily Subscription-driven';
            reasoning = 'Continuous, mission-critical problems often align with a core Subscription Model to ensure stable, always-on access for critical functions. This allows for predictable budgeting, with potential for outcome-based add-ons or premium tiers to reflect direct impact and value.';
            examples = ['Enterprise Security Platforms', 'Core Infrastructure Monitoring', 'Compliance Management SaaS', 'Financial Risk Management'];
        } else if (frequencyId === 'burst_episodic') {
            coreArchitecture = 'Primarily Usage-driven';
            reasoning = 'Burst/episodic mission-critical problems are well-suited for a Usage-Based Model. This ensures customers pay for value delivered during intense periods, offering scalability and fairness. This can include a base subscription with performance-based components.';
            examples = ['AI Fraud Detection (per transaction)', 'Incident Response Automation (per event)', 'Real-time Threat Intelligence (per query/alert)', 'API Rate Limit Management'];
        } else if (frequencyId === 'project_oriented') {
            coreArchitecture = 'Primarily Outcome-driven Potential';
            reasoning = 'For project-oriented problems with mission-critical outcomes, an Outcome-driven approach can be powerful, tying pricing directly to results. This often includes a base subscription for access and support, with performance-based components for actual outcomes achieved.';
            examples = ['AI Sales Prospecting (per qualified lead)', 'Automated Legal Review (per successful case)', 'AI-powered A/B Testing (per conversion lift)', 'Security Vulnerability Remediation (per fixed vulnerability)'];
        }
    } else if (criticalityId === 'efficiency') {
        if (frequencyId === 'continuous') {
            coreArchitecture = 'Primarily Subscription-driven';
            reasoning = 'Continuous efficiency-enhancing problems are best served by a core Subscription Model, providing ongoing access to tools that consistently improve workflows, automate tasks, and save time for users.';
            examples = ['Team Collaboration Software', 'Project Management Tools', 'CRM Automation', 'Cloud-based IDEs'];
        } else if (frequencyId === 'burst_episodic') {
            coreArchitecture = 'Primarily Usage-driven';
            reasoning = 'Burst/episodic problems focused on efficiency gain significantly from a Usage-Based Model. Customers pay for the specific resources consumed or operations performed during periods of high activity, ensuring costs align directly with efficiency delivered.';
            examples = ['Cloud Rendering Services (per hour/compute unit)', 'Data Enrichment APIs (per lookup)', 'AI Code Generation (per suggestion/lines of code)', 'Automated Data Transformation (per GB processed)'];
        } else if (frequencyId === 'project_oriented') {
             coreArchitecture = 'Primarily Usage-driven'; // Most common SaaS interpretation for projects
             reasoning = 'Even project-oriented efficiency problems in B2B SaaS typically resolve into a Usage-Based Model for resources consumed (e.g., specific reports, processing cycles) or a Time-Based Subscription for access during the project duration, avoiding non-recurring "fixed fees."';
             examples = ['AI Document Analysis (per document processed)', 'Automated Report Generation (per report)', 'Custom AI Model Training (per compute hour)', 'Data Migration Tools (per GB/record)'];
        }
    } else if (criticalityId === 'nice_to_have') {
        // Nice-to-have problems often need a low barrier to entry, leaning towards subscription for accessibility
        coreArchitecture = 'Primarily Subscription-driven';
        reasoning = 'For "nice-to-have" features, regardless of frequency, a simple, accessible Subscription Model (often with freemium or lower tiers) is crucial to drive adoption and prove value. Upselling to higher tiers can occur as perceived value grows and importance increases.';
        examples = ['Personal Productivity Apps', 'Advanced Analytics Dashboards (add-on)', 'Browser Extensions for niche functionality', 'AI Writing Assistants (basic tiers)'];
    }

    return { coreArchitecture, reasoning, examples };
}
```
````

**D. `getExamples` function:**

  * This function might become redundant if examples are directly generated within `generateRecommendation`. If kept, update its internal logic (`exampleMap`) to map to the new `coreArchitecture` and provide updated B2B SaaS examples as per the `generateRecommendation` function.

-----

### 3\. UI Component Updates (JSX within `PricingCalculator.tsx`)

**A. Header:**

  * Update `h1` title: `"Layer 1: Problem Characteristics & Business Model Fit"`
  * Update `p` subtitle: `"The most important question is how your solution's value delivery aligns with a scalable recurring revenue business model?"`

**B. Frequency Pattern Card:**

  * Update `CardTitle`: `"Frequency & Continuity"`
  * Update `CardDescription`: `"How often do customers experience the problem and need your solution?"`
  * Inside the `.map` loop for `frequencyPatterns`:
      * Display `pattern.title`, `pattern.subtitle`, and `pattern.description`.
      * **Crucially, remove the `Badge` component that displays `Consider → {pattern.recommendation}` or any similar direct recommendation at this stage.**
      * Maintain existing `Button` styling and selection logic.

**C. Criticality Pattern Card:**

  * Update `CardTitle`: `"Criticality & Impact"`
  * Update `CardDescription`: `"How vital is your solution to your customers' success and operations?"`
  * Inside the `.map` loop for `criticalityPatterns`:
      * Display `pattern.title` and `pattern.description`.
      * **Remove the `Badge` component displaying `Consider → {pattern.recommendation}` or any similar direct recommendation.**
      * Maintain existing `Button` styling and selection logic.

**D. Results Card (When `recommendation` is available):**

  * Update `CardTitle`: `"Recommended Core Pricing Architecture"`
  * Display the result:
      * Use a single, prominent `Badge` (or similar element) to show `recommendation.coreArchitecture`. **Remove the Primary/Secondary model distinction.**
      * Display `recommendation.reasoning` in a clear paragraph.
      * Display `recommendation.examples` using `Badge` components as before.
  * **Add** a new paragraph or section with a clear call to action:
    ```html
    <p className="mt-4 text-gray-700">
      Now that you've identified your core architecture, proceed to Layer 2 to determine the specific Value Metric.
    </p>
    ```
  * Maintain "Try Another Scenario" button functionality.

**E. Styling:**

  * Ensure all color usage within the component (backgrounds, text, borders, selected states) strictly adheres to the Overdrive color palette variables defined in `globals.css` or `index.css`.
  * Verify that fonts (Work Sans, Outfit) are correctly applied to all text elements (titles, descriptions, recommendations) as per brand guidelines.

-----

### 4\. CSS Updates (`index.css`, `globals.css`)

  * Review existing CSS. No major structural changes are anticipated here, but ensure:
      * All custom color variables or direct color values align with the Overdrive palette.
      * Font definitions are correctly linked and applied globally/locally as needed.
      * Responsive design and accessibility are maintained.

-----
