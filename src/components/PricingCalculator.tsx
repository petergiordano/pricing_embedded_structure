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
  primaryModel: string;
  secondaryModel?: string;
  reasoning: string;
  examples: string[];
}

const frequencyPatterns = [
  {
    id: 'continuous',
    title: 'Continuous',
    subtitle: 'always present',
    description: 'Your solution is used regularly and consistently',
    icon: Clock,
    recommendation: 'Subscription'
  },
  {
    id: 'burst',
    title: 'Burst',
    subtitle: 'intense periods',
    description: 'Usage comes in waves or specific time periods',
    icon: Zap,
    recommendation: 'Usage-Based'
  },
  {
    id: 'project',
    title: 'Project',
    subtitle: 'one-time fixes',
    description: 'Discrete projects or one-time implementations',
    icon: Target,
    recommendation: 'Fixed Fee'
  }
];

const criticalityPatterns = [
  {
    id: 'revenue-protecting',
    title: 'Revenue-Protecting',
    description: 'Directly impacts customer revenue or prevents losses',
    icon: Shield,
    recommendation: 'Outcome-Based'
  },
  {
    id: 'efficiency',
    title: 'Efficiency',
    description: 'Improves operational efficiency or productivity',
    icon: Settings,
    recommendation: 'Simple Tiers'
  },
  {
    id: 'nice-to-have',
    title: 'Nice-to-Have',
    description: 'Enhances experience but not mission-critical',
    icon: Heart,
    recommendation: 'Transparent'
  }
];

function generateRecommendation(frequency: string, criticality: string): PricingRecommendation {
  const freqPattern = frequencyPatterns.find(p => p.id === frequency);
  const critPattern = criticalityPatterns.find(p => p.id === criticality);
  
  if (!freqPattern || !critPattern) {
    return {
      primaryModel: 'Mixed Model',
      reasoning: 'Please select both patterns to get a recommendation.',
      examples: []
    };
  }

  // Determine primary model based on frequency pattern
  let primaryModel = freqPattern.recommendation;
  let secondaryModel = critPattern.recommendation;
  
  // Generate reasoning
  let reasoning = `Based on your ${freqPattern.title.toLowerCase()} usage pattern and ${critPattern.title.toLowerCase()} criticality, `;
  
  if (frequency === 'continuous' && criticality === 'revenue-protecting') {
    reasoning += 'a subscription model with outcome-based components would work best. Consider tiered subscriptions with revenue guarantees.';
    examples: ['SaaS with uptime SLAs', 'Managed security services', 'Business insurance'];
  } else if (frequency === 'burst' && criticality === 'efficiency') {
    reasoning += 'usage-based pricing with simple tiers provides the best alignment. Customers pay for what they use during peak periods.';
    examples: ['Cloud computing', 'CDN services', 'Seasonal consulting'];
  } else if (frequency === 'project' && criticality === 'nice-to-have') {
    reasoning += 'transparent fixed-fee pricing works well. Clear scope and deliverables with upfront pricing.';
    examples: ['Website design', 'Marketing campaigns', 'Training workshops'];
  } else {
    reasoning += `${primaryModel.toLowerCase()} pricing aligns with your usage pattern, while incorporating ${secondaryModel.toLowerCase()} elements addresses your criticality level.`;
  }

  const examples = getExamples(frequency, criticality);

  return {
    primaryModel,
    secondaryModel: secondaryModel !== primaryModel ? secondaryModel : undefined,
    reasoning,
    examples
  };
}

function getExamples(frequency: string, criticality: string): string[] {
  const exampleMap: Record<string, string[]> = {
    'continuous-revenue-protecting': ['Salesforce CRM', 'Stripe payments', 'AWS hosting'],
    'continuous-efficiency': ['Slack', 'Notion', 'Adobe Creative Suite'],
    'continuous-nice-to-have': ['Spotify', 'Netflix', 'Figma'],
    'burst-revenue-protecting': ['Cyber security incident response', 'Legal services', 'Emergency maintenance'],
    'burst-efficiency': ['Cloud computing', 'Seasonal staffing', 'Campaign management'],
    'burst-nice-to-have': ['Event planning', 'Photography services', 'Travel booking'],
    'project-revenue-protecting': ['Business transformation', 'Compliance audits', 'System integration'],
    'project-efficiency': ['Process optimization', 'Training programs', 'Tool implementation'],
    'project-nice-to-have': ['Brand design', 'Website redesign', 'Content creation']
  };
  
  return exampleMap[`${frequency}-${criticality}`] || ['Custom solution', 'Industry-specific pricing', 'Hybrid model'];
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
        <div className="p-8 rounded-2xl border border-gray-200 shadow-sm" style={{ backgroundColor: '#E1E8E6' }}>
          <h1 className="text-4xl mb-3" style={{ color: '#234F41' }}>Pattern Recognition Framework</h1>
          <p className="text-slate-600">The nature of your problem dictates your pricing model</p>
        </div>
      </div>

      {/* Frequency Pattern Selection */}
      <Card className="bg-white border border-gray-200 shadow-sm rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2" style={{ color: '#234F41' }}>
            <Clock className="w-5 h-5 text-slate-600" />
            Frequency Pattern
          </CardTitle>
          <CardDescription className="text-slate-600">
            How often do your customers use or need your solution?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {frequencyPatterns.map((pattern) => {
              const Icon = pattern.icon;
              const isSelected = state.frequencyPattern === pattern.id;
              
              return (
                <button
                  key={pattern.id}
                  onClick={() => setState(prev => ({ ...prev, frequencyPattern: pattern.id }))}
                  className={`p-5 rounded-xl border text-left transition-all hover:shadow-md ${
                    isSelected 
                      ? 'bg-emerald-50 shadow-md' 
                      : 'bg-white hover:shadow-sm'
                  }`}
                  style={{ borderColor: '#234F41' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-emerald-600' : 'text-slate-500'}`} />
                    <div>
                      <div className="font-medium text-slate-700">{pattern.title}</div>
                      <div className="text-sm text-slate-500">({pattern.subtitle})</div>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{pattern.description}</p>
                  <Badge 
                    variant={isSelected ? "default" : "secondary"} 
                    className={`text-xs ${isSelected ? 'bg-emerald-600 text-white' : 'text-slate-600'}`}
                    style={!isSelected ? { backgroundColor: '#E1E8E6' } : {}}
                  >
                    Consider → {pattern.recommendation}
                  </Badge>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Criticality Pattern Selection */}
      <Card className="bg-white border border-gray-200 shadow-sm rounded-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2" style={{ color: '#234F41' }}>
            <Target className="w-5 h-5 text-slate-600" />
            Criticality Pattern
          </CardTitle>
          <CardDescription className="text-slate-600">
            How critical is your solution to your customers' success?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {criticalityPatterns.map((pattern) => {
              const Icon = pattern.icon;
              const isSelected = state.criticalityPattern === pattern.id;
              
              return (
                <button
                  key={pattern.id}
                  onClick={() => setState(prev => ({ ...prev, criticalityPattern: pattern.id }))}
                  className={`p-5 rounded-xl border text-left transition-all hover:shadow-md ${
                    isSelected 
                      ? 'bg-orange-50 shadow-md' 
                      : 'bg-white hover:shadow-sm'
                  }`}
                  style={{ borderColor: '#234F41' }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <Icon className={`w-5 h-5 ${isSelected ? 'text-orange-500' : 'text-slate-500'}`} />
                    <div className="font-medium text-slate-700">{pattern.title}</div>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{pattern.description}</p>
                  <Badge 
                    variant={isSelected ? "destructive" : "secondary"} 
                    className={`text-xs ${isSelected ? 'bg-orange-500 text-white' : 'text-slate-600'}`}
                    style={!isSelected ? { backgroundColor: '#E1E8E6' } : {}}
                  >
                    Consider → {pattern.recommendation}
                  </Badge>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {recommendation && (
        <Card className="border-emerald-200 bg-emerald-50 rounded-2xl shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle style={{ color: '#234F41' }}>Your Pricing Recommendation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-emerald-600 text-white px-4 py-2 text-sm">
                Primary: {recommendation.primaryModel}
              </Badge>
              {recommendation.secondaryModel && (
                <Badge variant="outline" className="border-emerald-600 text-emerald-700 px-4 py-2 text-sm bg-white">
                  Secondary: {recommendation.secondaryModel}
                </Badge>
              )}
            </div>
            
            <p className="text-slate-700 leading-relaxed">{recommendation.reasoning}</p>
            
            {recommendation.examples.length > 0 && (
              <div>
                <h4 className="font-medium mb-3" style={{ color: '#234F41' }}>Similar Examples:</h4>
                <div className="flex flex-wrap gap-2">
                  {recommendation.examples.map((example, index) => (
                    <Badge key={index} variant="outline" className="text-slate-600 border-slate-300 bg-white px-3 py-1">
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            <Button 
              onClick={resetCalculator}
              variant="outline" 
              className="border-emerald-600 text-emerald-700 hover:bg-emerald-100 bg-white"
            >
              Try Another Scenario
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Progress indicator */}
      <div className="flex justify-center">
        <div className="flex gap-3">
          <div className={`w-3 h-3 rounded-full transition-colors ${state.frequencyPattern ? 'bg-emerald-500' : 'bg-gray-300'}`} />
          <div className={`w-3 h-3 rounded-full transition-colors ${state.criticalityPattern ? 'bg-orange-400' : 'bg-gray-300'}`} />
          <div className={`w-3 h-3 rounded-full transition-colors ${recommendation ? 'bg-slate-600' : 'bg-gray-300'}`} />
        </div>
      </div>
    </div>
  );
}