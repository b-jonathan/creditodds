-- Create audit log table for tracking admin actions
CREATE TABLE IF NOT EXISTS audit_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  admin_id VARCHAR(128) NOT NULL,
  action VARCHAR(50) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id INT,
  details JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_admin_id (admin_id),
  INDEX idx_action (action),
  INDEX idx_entity_type (entity_type),
  INDEX idx_created_at (created_at)
);
