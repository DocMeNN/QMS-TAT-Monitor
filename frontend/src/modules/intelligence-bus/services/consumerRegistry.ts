// src/modules/intelligence-bus/services/consumerRegistry.ts

/**
 * Consumer Registry
 * --------------------------------------------------
 * Central bootstrapper for all intelligence consumers.
 */

import { registerAlertConsumer } from "../consumers/alertConsumer";
import { registerIncidentConsumer } from "../consumers/incidentConsumer";
import { registerDecisionConsumer } from "../consumers/decisionConsumer";
import { registerOrchestrationConsumer } from "../consumers/orchestrationConsumer";
import { registerExecutionConsumer } from "../consumers/executionConsumer";

import { registerStrategyEvolutionConsumer } from "../consumers/strategyEvolutionConsumer";
import { registerSLAPreservationConsumer } from "../consumers/slaPreservationConsumer";
import { registerEscalationForecastConsumer } from "../consumers/escalationForecastConsumer";
import { registerDependencyIntelligenceConsumer } from "../consumers/dependencyIntelligenceConsumer";
import { registerRollbackArbitrationConsumer } from "../consumers/rollbackArbitrationConsumer";
import { registerDashboardSyncConsumer } from "../consumers/dashboardSyncConsumer";

let bootstrapped = false;

export function bootstrapConsumers() {
  if (bootstrapped) {
    return;
  }

  console.log(
    "[Consumer Registry] Bootstrapping Consumers"
  );

  registerAlertConsumer();

  registerIncidentConsumer();

  registerDecisionConsumer();

  registerOrchestrationConsumer();

  registerExecutionConsumer();

  registerStrategyEvolutionConsumer();

  registerSLAPreservationConsumer();

  registerEscalationForecastConsumer();

  registerDependencyIntelligenceConsumer();

  registerRollbackArbitrationConsumer();

  registerDashboardSyncConsumer();

  bootstrapped = true;

  console.log(
    "[Consumer Registry] Bootstrap Complete"
  );
}