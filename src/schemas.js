// 1. Strict taxonomy definitions declared clearly at file-level scope
const ChannelEnum = ["in_app_chat", "call_center", "email", "merchant_portal", "field_agent"];
const UserTypeEnum = ["customer", "merchant", "agent", "unknown"];
const EvidenceVerdictEnum = ["consistent", "inconsistent", "insufficient_data"];
const CaseTypeEnum = [
  "wrong_transfer", "payment_failed", "refund_request", "duplicate_payment",
  "merchant_settlement_delay", "agent_cash_in_issue", "phishing_or_social_engineering", "other"
];
const SeverityEnum = ["low", "medium", "high", "critical"];
const DepartmentEnum = [
  "customer_support", "dispute_resolution", "payments_ops", 
  "merchant_operations", "agent_operations", "fraud_risk"
];

/**
 * Validates incoming request structures safely
 */
function validateTicketRequest(body) {
  if (!body || typeof body !== 'object') {
    return { valid: false, error: "Request payload must be a valid JSON object." };
  }
  if (!body.ticket_id || typeof body.ticket_id !== 'string' || !body.ticket_id.trim()) {
    return { valid: false, error: "Missing or invalid field: ticket_id must be a non-empty string." };
  }
  if (!body.complaint || typeof body.complaint !== 'string' || !body.complaint.trim()) {
    return { valid: false, error: "The ticket complaint text cannot be empty or solely whitespace." };
  }
  
  body.language = body.language || "en";
  body.channel = ChannelEnum.includes(body.channel) ? body.channel : "in_app_chat";
  body.user_type = UserTypeEnum.includes(body.user_type) ? body.user_type : "customer";
  body.transaction_history = Array.isArray(body.transaction_history) ? body.transaction_history : [];
  body.metadata = (body.metadata && typeof body.metadata === 'object') ? body.metadata : {};
  
  return { valid: true, data: body };
}

/**
 * Outbound format enforcement mapper
 */
function enforceResponseSchema(output) {
  return {
    ticket_id: String(output.ticket_id || ""),
    relevant_transaction_id: output.relevant_transaction_id ? String(output.relevant_transaction_id) : null,
    evidence_verdict: EvidenceVerdictEnum.includes(output.evidence_verdict) ? output.evidence_verdict : "insufficient_data",
    case_type: CaseTypeEnum.includes(output.case_type) ? output.case_type : "other",
    severity: SeverityEnum.includes(output.severity) ? output.severity : "low",
    department: DepartmentEnum.includes(output.department) ? output.department : "customer_support",
    agent_summary: String(output.agent_summary || ""),
    recommended_next_action: String(output.recommended_next_action || ""),
    customer_reply: String(output.customer_reply || ""),
    human_review_required: Boolean(output.human_review_required),
    confidence: typeof output.confidence === 'number' ? parseFloat(output.confidence.toFixed(2)) : 1.0,
    reason_codes: Array.isArray(output.reason_codes) ? output.reason_codes : []
  };
}

module.exports = {
  validateTicketRequest,
  enforceResponseSchema,
  EvidenceVerdictEnum,
  CaseTypeEnum,
  SeverityEnum,
  DepartmentEnum
};