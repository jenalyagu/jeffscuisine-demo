import React, { useState, useEffect } from 'react';
import {
  Sprout, CalendarDays, Plus, Search, Trash2,
  ChevronLeft, ChevronRight, Sun, Droplets, Ruler,
  Leaf, CheckCircle2, XCircle, Info, Pencil,
} from 'lucide-react';
import { plantDatabase, categoryColors, difficultyColors, getPlantById, getCompanionDetails } from '../data/seedData';

// ─── helpers ──────────────────────────────────────────────────────────────────

const today = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const addDays = (date, n) => {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
};

const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const fmtDateShort = (d) =>
  new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

const daysBetween = (a, b) =>
  Math.round((new Date(b) - new Date(a)) / 86400000);

const getProgress = (planting) => {
  const days = daysBetween(planting.sowDate, today());
  if (days < 0) return 0;
  return Math.min(100, (days / planting.daysToHarvest) * 100);
};

const STAGES = [
  { label: 'Germinating', emoji: '💧', threshold: 0 },
  { label: 'Seedling',    emoji: '🌱', threshold: 20 },
  { label: 'Vegetative',  emoji: '🍃', threshold: 40 },
  { label: 'Flowering',   emoji: '🌸', threshold: 65 },
  { label: 'Harvest',     emoji: '🌾', threshold: 85 },
];

const getStage = (progress) => {
  let stage = STAGES[0];
  for (const s of STAGES) {
    if (progress >= s.threshold) stage = s;
  }
  return stage;
};

const getStageIndex = (progress) => {
  let idx = 0;
  for (let i = 0; i < STAGES.length; i++) {
    if (progress >= STAGES[i].threshold) idx = i;
  }
  return idx;
};

const stageColors = ['#90CAF9', '#66BB6A', '#2E7D32', '#FF9800', '#E65100'];

const uid = () => Math.random().toString(36).slice(2, 9);

// ─── Calendar helpers ─────────────────────────────────────────────────────────

const getCalendarEvents = (plantings, year, month) => {
  const events = {};
  const key = (d) => {
    const dt = new Date(d);
    if (dt.getFullYear() === year && dt.getMonth() === month)
      return dt.getDate();
    return null;
  };
  plantings.forEach((p) => {
    const sow = new Date(p.sowDate);
    const germ = addDays(p.sowDate, p.daysToGerminate);
    const harvest = addDays(p.sowDate, p.daysToHarvest);

    const sowKey = key(sow);
    const germKey = key(germ);
    const harvKey = key(harvest);

    if (sowKey) (events[sowKey] = events[sowKey] || []).push({ type: 'sow', plant: p });
    if (germKey) (events[germKey] = events[germKey] || []).push({ type: 'germ', plant: p });
    if (harvKey) (events[harvKey] = events[harvKey] || []).push({ type: 'harvest', plant: p });
  });
  return events;
};

const eventDot = { sow: '#66BB6A', germ: '#FDD835', harvest: '#FF9800' };
const eventLabel = { sow: 'Sow', germ: 'Sprout', harvest: '🌾 Harvest' };

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({ progress }) {
  const stageIdx = getStageIndex(progress);
  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', gap: 3, marginBottom: 6 }}>
        {STAGES.map((s, i) => (
          <div
            key={s.label}
            style={{
              flex: 1,
              height: 8,
              borderRadius: 4,
              background: i <= stageIdx ? stageColors[i] : 'rgba(255,255,255,0.15)',
              transition: 'background 0.4s',
            }}
          />
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {STAGES.map((s, i) => (
          <span
            key={s.label}
            style={{
              fontSize: 10,
              color: i === stageIdx ? stageColors[i] : 'rgba(255,255,255,0.35)',
              fontWeight: i === stageIdx ? 700 : 400,
              transition: 'color 0.4s',
            }}
          >
            {s.emoji}
          </span>
        ))}
      </div>
    </div>
  );
}

function PlantChip({ plant, color }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '3px 8px',
        borderRadius: 20,
        fontSize: 12,
        background: color || 'rgba(255,255,255,0.1)',
        color: '#fdfaf6',
        border: '1px solid rgba(255,255,255,0.15)',
      }}
    >
      {plant.emoji} {plant.name}
    </span>
  );
}

function GardenCard({ planting, onDelete }) {
  const progress = getProgress(planting);
  const stage = getStage(progress);
  const daysIn = Math.max(0, daysBetween(planting.sowDate, today()));
  const daysLeft = Math.max(0, planting.daysToHarvest - daysIn);
  const harvestDate = addDays(planting.sowDate, planting.daysToHarvest);
  const dbPlant = getPlantById(planting.plantId);
  const companions = dbPlant ? getCompanionDetails(dbPlant).good.slice(0, 4) : [];
  const isHarvestReady = progress >= 100;

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: `1px solid ${isHarvestReady ? '#FF9800' : 'rgba(255,255,255,0.12)'}`,
        borderRadius: 12,
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.85rem',
        position: 'relative',
        boxShadow: isHarvestReady ? '0 0 20px rgba(255,152,0,0.2)' : 'none',
        transition: 'box-shadow 0.3s',
      }}
    >
      {isHarvestReady && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            right: 42,
            background: '#FF9800',
            color: '#3e2723',
            fontSize: 11,
            fontWeight: 700,
            padding: '2px 8px',
            borderRadius: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
          }}
        >
          Ready!
        </div>
      )}

      <button
        onClick={() => onDelete(planting.id)}
        aria-label="Remove planting"
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
          background: 'transparent',
          border: 'none',
          color: 'rgba(255,255,255,0.3)',
          cursor: 'pointer',
          padding: 4,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Trash2 size={14} />
      </button>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingRight: 24 }}>
        <span style={{ fontSize: 28 }}>{planting.emoji}</span>
        <div>
          <div style={{ fontWeight: 700, fontSize: '1rem', color: '#fdfaf6' }}>
            {planting.plantName}
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 1 }}>
            Sown {fmtDateShort(planting.sowDate)} · {daysIn} day{daysIn !== 1 ? 's' : ''} ago
          </div>
        </div>
        <div
          style={{
            marginLeft: 'auto',
            background: 'rgba(255,255,255,0.08)',
            borderRadius: 8,
            padding: '4px 10px',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 18, lineHeight: 1 }}>{stage.emoji}</div>
          <div style={{ fontSize: 10, color: stageColors[getStageIndex(progress)], fontWeight: 600, marginTop: 2 }}>
            {stage.label}
          </div>
        </div>
      </div>

      {/* Progress */}
      <ProgressBar progress={progress} />

      {/* Harvest info */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: 13,
          color: 'rgba(255,255,255,0.65)',
        }}
      >
        <CalendarDays size={13} />
        {isHarvestReady ? (
          <span style={{ color: '#FF9800', fontWeight: 600 }}>Harvest ready — {fmtDateShort(harvestDate)}</span>
        ) : (
          <>
            <span>Expected harvest:</span>
            <span style={{ color: '#fdfaf6', fontWeight: 600 }}>{fmtDate(harvestDate)}</span>
            <span style={{ marginLeft: 'auto', color: '#FF9800', fontWeight: 600 }}>
              {daysLeft}d left
            </span>
          </>
        )}
      </div>

      {/* Companions */}
      {companions.length > 0 && (
        <div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Companion plants
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {companions.map((c) => <PlantChip key={c.id} plant={c} color="rgba(46,125,74,0.4)" />)}
          </div>
        </div>
      )}

      {planting.notes && (
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', fontStyle: 'italic', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 8 }}>
          {planting.notes}
        </div>
      )}
    </div>
  );
}

// ─── Add Plant Tab ─────────────────────────────────────────────────────────────

function AddPlantTab({ onAdd }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(null);
  const [sowDate, setSowDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [showCustom, setShowCustom] = useState(false);
  const [custom, setCustom] = useState({ name: '', emoji: '🌱', daysToGerminate: 7, daysToHarvest: 60 });
  const [flash, setFlash] = useState('');

  const filtered = plantDatabase.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleAdd = (plant) => {
    onAdd({
      id: uid(),
      plantId: plant.id || null,
      plantName: plant.name,
      emoji: plant.emoji,
      sowDate,
      daysToGerminate: plant.daysToGerminate,
      daysToHarvest: plant.daysToHarvest,
      notes,
    });
    setFlash(`${plant.emoji} ${plant.name} added to your garden!`);
    setNotes('');
    setTimeout(() => setFlash(''), 2500);
  };

  const handleAddCustom = () => {
    if (!custom.name) return;
    handleAdd({ ...custom, id: null });
    setCustom({ name: '', emoji: '🌱', daysToGerminate: 7, daysToHarvest: 60 });
    setShowCustom(false);
  };

  const companions = selected ? getCompanionDetails(selected) : null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {flash && (
        <div
          style={{
            background: 'rgba(46,125,74,0.5)',
            border: '1px solid #4CAF50',
            borderRadius: 8,
            padding: '0.75rem 1rem',
            color: '#fdfaf6',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <CheckCircle2 size={16} color="#66BB6A" /> {flash}
        </div>
      )}

      {/* Search + custom toggle */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 240px', position: 'relative' }}>
          <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search plants, herbs, flowers…"
            style={{
              width: '100%',
              padding: '0.7rem 0.75rem 0.7rem 2.25rem',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 8,
              color: '#fdfaf6',
              fontSize: 14,
            }}
          />
        </div>
        <button
          onClick={() => setShowCustom(!showCustom)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '0.7rem 1.1rem',
            background: showCustom ? 'rgba(255,152,0,0.2)' : 'rgba(255,255,255,0.08)',
            border: `1px solid ${showCustom ? '#FF9800' : 'rgba(255,255,255,0.15)'}`,
            borderRadius: 8,
            color: showCustom ? '#FF9800' : '#fdfaf6',
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 600,
            flexShrink: 0,
          }}
        >
          <Pencil size={14} /> Custom Plant
        </button>
      </div>

      {/* Custom plant form */}
      {showCustom && (
        <div
          style={{
            background: 'rgba(255,152,0,0.07)',
            border: '1px solid rgba(255,152,0,0.3)',
            borderRadius: 12,
            padding: '1.25rem',
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem' }}>
            Add a Custom Plant
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: '0 0 60px' }}>
              <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>Emoji</label>
              <input
                value={custom.emoji}
                onChange={(e) => setCustom({ ...custom, emoji: e.target.value })}
                style={{ ...inputStyle, textAlign: 'center', fontSize: 20 }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: '1 1 160px' }}>
              <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>Plant Name *</label>
              <input
                value={custom.name}
                onChange={(e) => setCustom({ ...custom, name: e.target.value })}
                placeholder="e.g. Purple Basil"
                style={inputStyle}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: '1 1 100px' }}>
              <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>Days to Germinate</label>
              <input
                type="number"
                min={1}
                value={custom.daysToGerminate}
                onChange={(e) => setCustom({ ...custom, daysToGerminate: +e.target.value })}
                style={inputStyle}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: '1 1 100px' }}>
              <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>Days to Harvest</label>
              <input
                type="number"
                min={1}
                value={custom.daysToHarvest}
                onChange={(e) => setCustom({ ...custom, daysToHarvest: +e.target.value })}
                style={inputStyle}
              />
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 10 }}>
            <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>Sow Date</label>
            <input type="date" value={sowDate} onChange={(e) => setSowDate(e.target.value)} style={{ ...inputStyle, width: 200 }} />
          </div>
          <button
            onClick={handleAddCustom}
            disabled={!custom.name}
            style={{ ...addBtnStyle, marginTop: 12, opacity: custom.name ? 1 : 0.4 }}
          >
            <Plus size={14} /> Add {custom.emoji} {custom.name || 'Plant'} to Garden
          </button>
        </div>
      )}

      {/* Plant catalogue grid */}
      <div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
          Plant Catalogue — {filtered.length} plants
        </div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))',
            gap: 8,
          }}
        >
          {filtered.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelected(selected?.id === p.id ? null : p)}
              style={{
                background: selected?.id === p.id ? 'rgba(255,152,0,0.2)' : 'rgba(255,255,255,0.06)',
                border: `1px solid ${selected?.id === p.id ? '#FF9800' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 10,
                padding: '0.6rem 0.4rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: 22 }}>{p.emoji}</span>
              <span style={{ fontSize: 11, color: '#fdfaf6', lineHeight: 1.2, textAlign: 'center' }}>{p.name}</span>
              <span style={{ fontSize: 9, color: categoryColors[p.category], textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                {p.category}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected plant detail panel */}
      {selected && (
        <div
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 12,
            padding: '1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            {/* Left: plant info */}
            <div style={{ flex: '1 1 220px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 32 }}>{selected.emoji}</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{selected.name}</div>
                  <span
                    style={{
                      fontSize: 11,
                      background: difficultyColors[selected.difficulty] + '33',
                      color: difficultyColors[selected.difficulty],
                      border: `1px solid ${difficultyColors[selected.difficulty]}66`,
                      borderRadius: 8,
                      padding: '1px 6px',
                    }}
                  >
                    {selected.difficulty}
                  </span>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
                {[
                  { icon: <Sprout size={12} />, label: 'Germinates', val: `${selected.daysToGerminate} days` },
                  { icon: <CalendarDays size={12} />, label: 'Harvest', val: `${selected.daysToHarvest} days` },
                  { icon: <Sun size={12} />, label: 'Sun', val: selected.sunNeeds },
                  { icon: <Droplets size={12} />, label: 'Water', val: `${selected.waterNeeds} needs` },
                  { icon: <Ruler size={12} />, label: 'Spacing', val: `${selected.spacing} cm` },
                ].map(({ icon, label, val }) => (
                  <div key={label} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 8, padding: '6px 8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,0.45)', fontSize: 11, marginBottom: 2 }}>
                      {icon} {label}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#fdfaf6' }}>{val}</div>
                  </div>
                ))}
              </div>
              {selected.notes && (
                <div style={{ display: 'flex', gap: 6, fontSize: 12, color: 'rgba(255,255,255,0.55)', background: 'rgba(255,255,255,0.04)', borderRadius: 8, padding: '8px 10px' }}>
                  <Info size={12} style={{ flexShrink: 0, marginTop: 2 }} /> {selected.notes}
                </div>
              )}
            </div>

            {/* Right: companions */}
            <div style={{ flex: '1 1 180px' }}>
              {companions.good.length > 0 && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 11, color: '#66BB6A', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <CheckCircle2 size={11} /> Good Companions
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {companions.good.map((c) => <PlantChip key={c.id} plant={c} color="rgba(46,125,74,0.35)" />)}
                  </div>
                </div>
              )}
              {companions.avoid.length > 0 && (
                <div>
                  <div style={{ fontSize: 11, color: '#EF5350', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <XCircle size={11} /> Avoid Planting Near
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {companions.avoid.map((c) => <PlantChip key={c.id} plant={c} color="rgba(198,40,40,0.25)" />)}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sow date + notes + add */}
          <div
            style={{
              borderTop: '1px solid rgba(255,255,255,0.1)',
              paddingTop: '1rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
              alignItems: 'flex-end',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>Sow Date</label>
              <input type="date" value={sowDate} onChange={(e) => setSowDate(e.target.value)} style={inputStyle} />
            </div>
            <div style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>Notes (optional)</label>
              <input
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Bed 2, south-facing, etc."
                style={inputStyle}
              />
            </div>
            <button onClick={() => handleAdd(selected)} style={addBtnStyle}>
              <Plus size={14} /> Add to My Garden
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Calendar Tab ─────────────────────────────────────────────────────────────

function CalendarTab({ plantings }) {
  const [viewDate, setViewDate] = useState(new Date());
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const monthName = viewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayDate = today().getDate();
  const todayMonth = today().getMonth();
  const todayYear = today().getFullYear();

  const events = getCalendarEvents(plantings, year, month);

  // Upcoming events (next 60 days)
  const upcoming = [];
  plantings.forEach((p) => {
    ['germ', 'harvest'].forEach((type) => {
      const date = type === 'germ'
        ? addDays(p.sowDate, p.daysToGerminate)
        : addDays(p.sowDate, p.daysToHarvest);
      const daysAway = daysBetween(today(), date);
      if (daysAway >= 0 && daysAway <= 60) {
        upcoming.push({ date, daysAway, type, plant: p });
      }
    });
    const sowAway = daysBetween(today(), new Date(p.sowDate));
    if (sowAway >= 0 && sowAway <= 7) {
      upcoming.push({ date: new Date(p.sowDate), daysAway: sowAway, type: 'sow', plant: p });
    }
  });
  upcoming.sort((a, b) => a.daysAway - b.daysAway);

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isToday = (d) => d === todayDate && month === todayMonth && year === todayYear;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Month navigation */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button onClick={prevMonth} style={navBtnStyle}><ChevronLeft size={18} /></button>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 700 }}>{monthName}</span>
        <button onClick={nextMonth} style={navBtnStyle}><ChevronRight size={18} /></button>
      </div>

      {/* Day headers */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} style={{ textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600, padding: '4px 0', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {d}
          </div>
        ))}
        {cells.map((day, i) => {
          const dayEvents = day ? (events[day] || []) : [];
          return (
            <div
              key={i}
              style={{
                minHeight: 56,
                background: day ? (isToday(day) ? 'rgba(255,152,0,0.18)' : 'rgba(255,255,255,0.04)') : 'transparent',
                border: day ? `1px solid ${isToday(day) ? '#FF9800' : 'rgba(255,255,255,0.08)'}` : 'none',
                borderRadius: 8,
                padding: '4px 5px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
              }}
            >
              {day && (
                <>
                  <span style={{ fontSize: 12, color: isToday(day) ? '#FF9800' : 'rgba(255,255,255,0.75)', fontWeight: isToday(day) ? 700 : 400 }}>
                    {day}
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
                    {dayEvents.slice(0, 3).map((ev, j) => (
                      <div
                        key={j}
                        title={`${ev.type === 'sow' ? '🌱 Sow' : ev.type === 'germ' ? '🌿 Germination' : '🌾 Harvest'}: ${ev.plant.plantName}`}
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: '50%',
                          background: eventDot[ev.type],
                          flexShrink: 0,
                        }}
                      />
                    ))}
                    {dayEvents.length > 3 && (
                      <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)' }}>+{dayEvents.length - 3}</span>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {Object.entries(eventDot).map(([type, color]) => (
          <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: color }} />
            {eventLabel[type]}
          </div>
        ))}
      </div>

      {/* Upcoming events */}
      {upcoming.length > 0 && (
        <div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: 10 }}>
            Upcoming (next 60 days)
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {upcoming.map((ev, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: 8,
                  padding: '8px 12px',
                  borderLeft: `3px solid ${eventDot[ev.type]}`,
                }}
              >
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: eventDot[ev.type], flexShrink: 0 }} />
                <span style={{ fontSize: 16 }}>{ev.plant.emoji}</span>
                <div style={{ flex: 1 }}>
                  <span style={{ color: '#fdfaf6', fontWeight: 600, fontSize: 13 }}>{ev.plant.plantName}</span>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13 }}>
                    {' '}— {ev.type === 'sow' ? 'sow date' : ev.type === 'germ' ? 'expected germination' : '🌾 harvest ready'}
                  </span>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 12, color: eventDot[ev.type], fontWeight: 700 }}>
                    {ev.daysAway === 0 ? 'Today' : `${ev.daysAway}d`}
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>{fmtDateShort(ev.date)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {upcoming.length === 0 && plantings.length > 0 && (
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: 14, padding: '1rem' }}>
          No upcoming events in the next 60 days.
        </div>
      )}

      {plantings.length === 0 && (
        <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.35)', fontSize: 14, padding: '2rem' }}>
          Add plants to your garden to see events on the calendar.
        </div>
      )}
    </div>
  );
}

// ─── Shared styles ─────────────────────────────────────────────────────────────

const inputStyle = {
  padding: '0.6rem 0.75rem',
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: 8,
  color: '#fdfaf6',
  fontSize: 14,
  width: '100%',
};

const addBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: '0.65rem 1.2rem',
  background: '#FF9800',
  border: 'none',
  borderRadius: 8,
  color: '#3e2723',
  fontWeight: 700,
  fontSize: 14,
  cursor: 'pointer',
  flexShrink: 0,
  whiteSpace: 'nowrap',
};

const navBtnStyle = {
  background: 'rgba(255,255,255,0.08)',
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: 8,
  color: '#fdfaf6',
  cursor: 'pointer',
  padding: '6px 10px',
  display: 'flex',
  alignItems: 'center',
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────

const TABS = [
  { id: 'garden', label: 'My Garden', icon: <Leaf size={15} /> },
  { id: 'add',    label: 'Add Plants', icon: <Plus size={15} /> },
  { id: 'calendar', label: 'Calendar', icon: <CalendarDays size={15} /> },
];

export default function SeedSowingDashboard() {
  const [tab, setTab] = useState('garden');
  const [plantings, setPlantings] = useState(() => {
    try { return JSON.parse(localStorage.getItem('seedPlantings') || '[]'); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('seedPlantings', JSON.stringify(plantings));
  }, [plantings]);

  const addPlanting = (p) => setPlantings((prev) => [p, ...prev]);
  const deletePlanting = (id) => setPlantings((prev) => prev.filter((p) => p.id !== id));

  const harvestReady = plantings.filter((p) => getProgress(p) >= 100).length;
  const inProgress = plantings.length - harvestReady;

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100vw',
        background: 'linear-gradient(160deg, #0d2b1a 0%, #1b4f34 40%, #0a1f0f 100%)',
        padding: '5rem 0 4rem',
        overflow: 'hidden',
      }}
    >
      {/* Decorative blobs */}
      <div style={{ position: 'absolute', top: -80, right: -80, width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(46,125,74,0.25) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -60, left: -60, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,152,0,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div
        style={{
          position: 'relative',
          zIndex: 20,
          maxWidth: 1100,
          width: '100%',
          margin: '0 auto',
          padding: '0 1.5rem',
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <Sprout size={28} color="#66BB6A" />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#fdfaf6', margin: 0 }}>
              Seed Sowing Dashboard
            </h2>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', margin: 0, maxWidth: 520 }}>
            Track your garden from seed to harvest — with companion planting suggestions and a custom grow calendar.
          </p>

          {/* Stats pills */}
          {plantings.length > 0 && (
            <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
              {[
                { label: 'Total Plantings', val: plantings.length, color: '#66BB6A' },
                { label: 'Growing', val: inProgress, color: '#4FC3F7' },
                { label: 'Harvest Ready', val: harvestReady, color: '#FF9800' },
              ].map(({ label, val, color }) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: 20,
                    padding: '4px 14px',
                  }}
                >
                  <span style={{ fontSize: 16, fontWeight: 700, color }}>{val}</span>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: 0 }}>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '0.6rem 1.1rem',
                background: 'transparent',
                border: 'none',
                borderBottom: `2px solid ${tab === t.id ? '#FF9800' : 'transparent'}`,
                color: tab === t.id ? '#FF9800' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: tab === t.id ? 700 : 400,
                transition: 'all 0.2s',
                marginBottom: -1,
              }}
            >
              {t.icon} {t.label}
              {t.id === 'garden' && plantings.length > 0 && (
                <span style={{ background: 'rgba(255,152,0,0.2)', color: '#FF9800', borderRadius: 10, fontSize: 11, padding: '0px 6px', fontWeight: 700 }}>
                  {plantings.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ minHeight: 400 }}>
          {tab === 'garden' && (
            <>
              {plantings.length === 0 ? (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '4rem 2rem',
                    color: 'rgba(255,255,255,0.35)',
                  }}
                >
                  <Sprout size={48} style={{ marginBottom: 12, opacity: 0.3 }} />
                  <div style={{ fontSize: '1.1rem', marginBottom: 8 }}>Your garden is empty</div>
                  <div style={{ fontSize: 14 }}>Head to <strong style={{ color: 'rgba(255,255,255,0.6)' }}>Add Plants</strong> to start sowing seeds.</div>
                  <button onClick={() => setTab('add')} style={{ ...addBtnStyle, margin: '1.5rem auto 0', display: 'inline-flex' }}>
                    <Plus size={14} /> Add Your First Plant
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: '1rem',
                  }}
                >
                  {plantings.map((p) => (
                    <GardenCard key={p.id} planting={p} onDelete={deletePlanting} />
                  ))}
                </div>
              )}
            </>
          )}

          {tab === 'add' && <AddPlantTab onAdd={(p) => { addPlanting(p); setTab('garden'); }} />}

          {tab === 'calendar' && <CalendarTab plantings={plantings} />}
        </div>
      </div>
    </section>
  );
}
