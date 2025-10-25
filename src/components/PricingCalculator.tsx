import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Clock, Zap, Target, Shield, Settings, Heart } from 'lucide-react';

interface CalculatorState {
  frequencyPattern: string | null;
  criticalityPattern: string | null;
}

interface PricingRecommendation {
  coreArchitecture: string;
  reasoning: string;
  examples: string[];
}

const frequencyPatterns = [
  {
    id: 'continuous',
    title: 'Continuous Problems',
    subtitle: '(Always Present)',
    description: 'The customer\'s need is constant and ongoing.',
    icon: Clock,
    recommendation: 'Subscription'
  },
  {
    id: 'burst_episodic',
    title: 'Burst / Episodic Problems',
    subtitle: '(Intense Periods)',
    description: 'The need spikes during specific events or cycles.',
    icon: Zap,
    recommendation: 'Usage-Based'
  },
  {
    id: 'project_oriented',
    title: 'Project-based Problems',
    subtitle: '(Defined Beginning/End)',
    description: 'The need is for a solution for a distinct task or limited time frame.',
    icon: Target,
    recommendation: 'Usage-Based'
  }
];

const criticalityPatterns = [
  {
    id: 'mission_critical',
    title: 'Mission-Critical / Revenue-Protecting',
    description: 'Directly impacts revenue, prevents significant losses, or enables core business functions.',
    icon: Shield,
    recommendation: 'Outcome-Based'
  },
  {
    id: 'efficiency',
    title: 'Efficiency / Productivity Enhancing',
    description: 'Improves workflows, saves time, or reduces operational costs for teams and users.',
    icon: Settings,
    recommendation: 'Simple Tiers'
  },
  {
    id: 'nice_to_have',
    title: 'Nice-to-Have / Strategic Enhancement',
    description: 'Provides additional benefits, improves experience, or supports future business strategy.',
    icon: Heart,
    recommendation: 'Transparent'
  }
];

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
      coreArchitecture = 'Primarily Usage-driven';
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


export function PricingCalculator() {
  const [state, setState] = useState<CalculatorState>({
    frequencyPattern: null,
    criticalityPattern: null
  });

  const recommendation = state.frequencyPattern && state.criticalityPattern 
    ? generateRecommendation(state.frequencyPattern, state.criticalityPattern)
    : null;

  const resetCalculator = () => {
    setState({ frequencyPattern: null, criticalityPattern: null });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="p-8 rounded-2xl" style={{ backgroundColor: '#e5ecea' }}>
          <h1 className="text-4xl mb-3" style={{ color: '#224f41' }}>Pattern Recognition Framework</h1>
          <p className="text-slate-600">The nature of your problem dictates your pricing model</p>
        </div>
      </div>

      {/* Frequency Pattern Selection */}
      <Card className="bg-white border border-gray-200 shadow-sm rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2" style={{ color: '#224f41' }}>
            <Clock className="w-5 h-5 text-slate-600" />
            Frequency & Continuity
          </CardTitle>
          <CardDescription className="text-slate-600">
            How often do customers experience the problem and need your solution?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ gridAutoRows: '1fr' }}>
            {frequencyPatterns.map((pattern) => {
              const Icon = pattern.icon;
              const isSelected = state.frequencyPattern === pattern.id;

              return (
                <button
                  key={pattern.id}
                  onClick={() => setState(prev => ({ ...prev, frequencyPattern: pattern.id }))}
                  className={`p-5 rounded-xl border text-left transition-all hover:shadow-md h-full ${
                    isSelected
                      ? 'shadow-md'
                      : 'bg-white hover:shadow-sm'
                  }`}
                  style={{
                    borderColor: '#224f41',
                    backgroundColor: isSelected ? '#e5ecea' : 'white'
                  }}
                >
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <Icon className={`w-5 h-5 ${isSelected ? '' : 'text-slate-500'}`} style={isSelected ? { color: '#224f41' } : {}} />
                        <div>
                          <div className="font-medium text-slate-700">{pattern.title}</div>
                          <div className="text-sm text-slate-500">{pattern.subtitle}</div>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{pattern.description}</p>
                    </div>
                    <div>
                      <Badge
                        className="text-xs whitespace-nowrap"
                        style={{
                          backgroundColor: isSelected ? '#224f41' : '#e5ecea',
                          color: isSelected ? 'white' : '#224f41',
                          display: 'inline-block'
                        }}
                      >
                        Consider → {pattern.recommendation}
                      </Badge>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Criticality Pattern Selection */}
      <Card className="bg-white border border-gray-200 shadow-sm rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2" style={{ color: '#224f41' }}>
            <Target className="w-5 h-5 text-slate-600" />
            Criticality & Impact
          </CardTitle>
          <CardDescription className="text-slate-600">
            How vital is your solution to your customers' success and operations?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ gridAutoRows: '1fr' }}>
            {criticalityPatterns.map((pattern) => {
              const Icon = pattern.icon;
              const isSelected = state.criticalityPattern === pattern.id;

              return (
                <button
                  key={pattern.id}
                  onClick={() => setState(prev => ({ ...prev, criticalityPattern: pattern.id }))}
                  className={`p-5 rounded-xl border text-left transition-all hover:shadow-md h-full ${
                    isSelected
                      ? 'shadow-md'
                      : 'bg-white hover:shadow-sm'
                  }`}
                  style={{
                    borderColor: '#224f41',
                    backgroundColor: isSelected ? '#e5ecea' : 'white'
                  }}
                >
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <Icon className={`w-5 h-5 ${isSelected ? '' : 'text-slate-500'}`} style={isSelected ? { color: '#224f41' } : {}} />
                        <div className="font-medium text-slate-700">{pattern.title}</div>
                      </div>
                      <p className="text-sm text-slate-600 mb-3">{pattern.description}</p>
                    </div>
                    <div>
                      <Badge
                        className="text-xs whitespace-nowrap"
                        style={{
                          backgroundColor: isSelected ? '#224f41' : '#e5ecea',
                          color: isSelected ? 'white' : '#224f41',
                          display: 'inline-block'
                        }}
                      >
                        Consider → {pattern.recommendation}
                      </Badge>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {recommendation && (
        <Card className="rounded-2xl shadow-sm" style={{ borderColor: '#7da399', backgroundColor: '#e5ecea' }}>
          <CardHeader className="pb-4">
            <CardTitle style={{ color: '#224f41' }}>Recommended Core Pricing Architecture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <Badge className="text-white px-4 py-2 text-sm" style={{ backgroundColor: '#224f41' }}>
                {recommendation.coreArchitecture}
              </Badge>
            </div>

            <p className="text-slate-700 leading-relaxed">{recommendation.reasoning}</p>

            {recommendation.examples.length > 0 && (
              <div>
                <h4 className="font-medium mb-3" style={{ color: '#224f41' }}>Similar Examples:</h4>
                <div className="flex flex-wrap gap-2">
                  {recommendation.examples.map((example, index) => (
                    <Badge key={index} variant="outline" className="text-slate-600 bg-white px-3 py-1" style={{ borderColor: '#7da399' }}>
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <p className="mt-4 text-gray-700">
              Now that you've identified your core architecture, proceed to Layer 2 to determine the specific Value Metric.
            </p>

            <Button
              onClick={resetCalculator}
              variant="outline"
              className="bg-white hover:bg-opacity-90"
              style={{ borderColor: '#224f41', color: '#224f41' }}
            >
              Try Another Scenario
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Progress indicator */}
      <div className="flex justify-center">
        <div className="flex gap-3">
          <div
            className="w-3 h-3 rounded-full transition-colors"
            style={{ backgroundColor: state.frequencyPattern ? '#224f41' : '#d1d5db' }}
          />
          <div
            className="w-3 h-3 rounded-full transition-colors"
            style={{ backgroundColor: state.criticalityPattern ? '#e5a819' : '#d1d5db' }}
          />
          <div
            className="w-3 h-3 rounded-full transition-colors"
            style={{ backgroundColor: recommendation ? '#0d71a9' : '#d1d5db' }}
          />
        </div>
      </div>
    </div>
  );
}