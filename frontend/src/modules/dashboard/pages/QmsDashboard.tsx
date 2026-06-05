// src/modules/dashboard/pages/QmsDashboard.tsx

import AutonomousMitigationPanel from "../components/AutonomousMitigationPanel";
import RecoveryLearningPanel from "../components/RecoveryLearningPanel";
import StrategyEvolutionPanel from "../components/StrategyEvolutionPanel";
import PolicyMutationPanel from "../components/PolicyMutationPanel";
import MetaGovernancePanel from "../components/MetaGovernancePanel";
import RollbackArbitrationPanel from "../components/RollbackArbitrationPanel";
import EscalationForecastPanel from "../components/EscalationForecastPanel";
import PriorityReallocationPanel from "../components/PriorityReallocationPanel";
import DependencyIntelligencePanel from "../components/DependencyIntelligencePanel";
import SlaPreservationPanel from "../components/SlaPreservationPanel";
import ExecutiveDecisionPanel from "../components/ExecutiveDecisionPanel";
import AlertIntelligencePanel from "../components/AlertIntelligencePanel";
import IncidentPredictionPanel from "../components/IncidentPredictionPanel";
import AlertCorrelationPanel from "../components/AlertCorrelationPanel";
import NotificationRoutingPanel from "../components/NotificationRoutingPanel";
import IncidentResponsePanel from "../components/IncidentResponsePanel";
import DecisionAutomationPanel from "../components/DecisionAutomationPanel";
import PredictiveOptimizationPanel from "../components/PredictiveOptimizationPanel";
import CognitiveCoordinationPanel from "../components/CognitiveCoordinationPanel";

export default function QmsDashboard() {
  return (
    <div className="p-6 space-y-8 text-slate-100">

      <div>
        <h1 className="text-3xl font-bold text-cyan-300">
          QMS TAT Monitor
        </h1>

        <p className="text-slate-300">
          Autonomous resilience governance platform
        </p>
      </div>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-cyan-200">
          Autonomous Resilience Intelligence
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
          <AutonomousMitigationPanel />
          <RecoveryLearningPanel />
          <StrategyEvolutionPanel />
          <PolicyMutationPanel />
          <MetaGovernancePanel />
          <RollbackArbitrationPanel />
          <EscalationForecastPanel />
          <PriorityReallocationPanel />
          <DependencyIntelligencePanel />
          <SlaPreservationPanel />
          <ExecutiveDecisionPanel />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-cyan-200">
          Alert Intelligence
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
          <AlertIntelligencePanel />
          <IncidentPredictionPanel />
          <AlertCorrelationPanel />
          <NotificationRoutingPanel />
          <IncidentResponsePanel />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4 text-cyan-200">
          Autonomous Cognitive Orchestration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
          <DecisionAutomationPanel />
          <PredictiveOptimizationPanel />
          <CognitiveCoordinationPanel />
        </div>
      </section>

    </div>
  );
}