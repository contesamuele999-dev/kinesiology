-- Schema del sync. Nessun dato leggibile: solo id, timestamp e ciphertext.
CREATE TABLE IF NOT EXISTS spaces (
  space TEXT PRIMARY KEY,
  seq   INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS records (
  space      TEXT NOT NULL,
  store      TEXT NOT NULL,
  id         TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  seq        INTEGER NOT NULL,
  iv         TEXT NOT NULL DEFAULT '',
  ct         TEXT NOT NULL DEFAULT '',
  deleted    INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (space, store, id)
);

-- Il pull legge sempre per spazio e cursore.
CREATE INDEX IF NOT EXISTS idx_records_seq ON records (space, seq);
