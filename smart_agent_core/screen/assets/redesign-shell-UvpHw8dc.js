import{i as fe,A as _,E as xe,b as u,a as be,s as O,c as ye,d as we,G as se,e as ne,f as ke,g as ae,h as oe,V as $e,r as Me,j as _e,k as Se,l as Ce,m as De,n as re,o as Te,p as b,t as ze}from"./index-Cd6eAcem.js";const Ae=fe`
  :host {
    --bg: #060A13;
    --bg2: #0A1120;
    --surface: #111A2B;
    --surface2: #172236;
    --line: rgba(255, 255, 255, 0.07);
    --text: #EEF1F8;
    --text2: #9AA6BD;
    --text3: #64708A;
    --primary: #7C8CFF;
    --primary2: #5B6CF0;
    --cyan: #38D5F5;
    --ok: #4CD7B0;
    --warn: #F6C76A;
    --bad: #FF7B7B;
    --amber: #FFB547;
    --tile-on: #F3F4FA;
    --tile-on-text: #121726;
    --tile-on-sub: #5B6275;
    --r: 22px;

    display: block;
    width: 100vw;
    height: 100vh;
    background: var(--bg);
    color: var(--text);
    font-family: "MiSans", "HarmonyOS Sans SC", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
    overflow: hidden;
    user-select: none;
    -webkit-font-smoothing: antialiased;
  }

  :host([data-theme="light"]),
  :host(.theme-light) {
    --bg: #EEF1F7;
    --bg2: #E6EAF3;
    --surface: #FFFFFF;
    --surface2: #F4F6FB;
    --line: rgba(16, 24, 40, 0.07);
    --text: #141A2A;
    --text2: #5A6479;
    --text3: #8B94A8;
    --tile-on: #FFF6E4;
    --tile-on-text: #2B2210;
    --tile-on-sub: #8A7550;
  }

  * {
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }

  button {
    font: inherit;
    color: inherit;
    background: none;
    border: 0;
    cursor: pointer;
    padding: 0;
  }

  .screen {
    position: relative;
    width: 100%;
    height: 100%;
    background:
      radial-gradient(900px 500px at 12% 0%, rgba(124, 140, 255, 0.13), transparent 60%),
      radial-gradient(700px 420px at 92% 100%, rgba(56, 213, 245, 0.08), transparent 60%),
      linear-gradient(180deg, var(--bg2), var(--bg));
    display: grid;
    grid-template-rows: 76px 1fr;
    grid-template-columns: 320px 1fr;
    overflow: hidden;
  }

  /* ===== Top Bar ===== */
  .top {
    grid-column: 1 / -1;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 0 22px;
    border-bottom: 1px solid var(--line);
    min-width: 0;
  }
  .brand {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 298px;
    flex-shrink: 0;
  }
  .logo {
    width: 34px;
    height: 34px;
    border-radius: 11px;
    background: linear-gradient(135deg, var(--primary), var(--cyan));
    display: grid;
    place-items: center;
    color: #06101f;
    font-weight: 800;
    box-shadow: 0 6px 18px rgba(124, 140, 255, 0.35);
    flex-shrink: 0;
  }
  .brand .t1 {
    font-size: 17px;
    font-weight: 700;
    letter-spacing: 0.2px;
  }
  .brand .t2 {
    font-size: 12px;
    color: var(--text2);
  }
  .tabs {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    flex: 1;
    padding: 4px 2px;
    scrollbar-width: none;
  }
  .tabs::-webkit-scrollbar {
    display: none;
  }
  .tab {
    height: 46px;
    padding: 0 18px;
    border-radius: 999px;
    background: var(--surface);
    border: 1px solid var(--line);
    color: var(--text2);
    font-size: 15px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
    transition: 0.16s;
    flex-shrink: 0;
  }
  .tab .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--ok);
  }
  .tab.active {
    background: var(--primary);
    color: #fff;
    border-color: transparent;
    box-shadow: 0 6px 18px rgba(124, 140, 255, 0.38);
  }
  .tab.active .dot {
    background: #fff;
  }
  .top-right {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }
  .net {
    height: 38px;
    padding: 0 13px;
    border-radius: 999px;
    background: var(--surface);
    border: 1px solid var(--line);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--text2);
    cursor: pointer;
    white-space: nowrap;
  }
  .net i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--ok);
    box-shadow: 0 0 10px var(--ok);
    display: inline-block;
  }
  .net.warn i {
    background: var(--warn);
    box-shadow: 0 0 10px var(--warn);
  }
  .net.bad i {
    background: var(--bad);
    box-shadow: 0 0 10px var(--bad);
  }
  .ibtn {
    width: 42px;
    height: 42px;
    border-radius: 13px;
    background: var(--surface);
    border: 1px solid var(--line);
    display: grid;
    place-items: center;
    color: var(--text2);
    flex-shrink: 0;
  }
  .ibtn:active {
    transform: scale(0.95);
  }
  .mus-pill {
    height: 46px;
    padding: 0 16px;
    border-radius: 999px;
    background: var(--surface);
    border: 1px solid var(--line);
    display: inline-flex;
    align-items: center;
    gap: 9px;
    font-size: 14px;
    font-weight: 600;
    color: var(--text2);
    transition: 0.16s;
    white-space: nowrap;
  }
  .mus-pill.on {
    color: var(--text);
    border-color: rgba(124, 140, 255, 0.45);
    background: linear-gradient(135deg, rgba(124, 140, 255, 0.22), rgba(56, 213, 245, 0.12));
  }
  .mus-pill.active {
    background: var(--primary);
    color: #fff;
    border-color: transparent;
    box-shadow: 0 6px 18px rgba(124, 140, 255, 0.38);
  }
  .eq {
    display: inline-flex;
    align-items: flex-end;
    gap: 2px;
    height: 14px;
  }
  .eq i {
    width: 3px;
    background: currentColor;
    border-radius: 2px;
    height: 4px;
    transition: 0.2s;
    display: inline-block;
  }
  .playing .eq i:nth-child(1) {
    animation: eq 0.7s infinite ease-in-out;
  }
  .playing .eq i:nth-child(2) {
    animation: eq 0.55s 0.15s infinite ease-in-out;
  }
  .playing .eq i:nth-child(3) {
    animation: eq 0.65s 0.3s infinite ease-in-out;
  }
  @keyframes eq {
    0%, 100% { height: 4px; }
    50% { height: 14px; }
  }

  /* ===== Left Column (Home Context) ===== */
  .side {
    padding: 18px 18px 18px 22px;
    border-right: 1px solid var(--line);
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-height: 0;
    overflow-y: auto;
    scrollbar-width: none;
  }
  .side::-webkit-scrollbar {
    display: none;
  }
  .clock-card {
    padding: 16px 18px;
    border-radius: var(--r);
    background: var(--surface);
    border: 1px solid var(--line);
    flex-shrink: 0;
  }
  .time-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
  .time {
    font-size: 62px;
    font-weight: 300;
    letter-spacing: -2px;
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .date {
    font-size: 13px;
    color: var(--text2);
    margin-top: 6px;
  }
  .wx {
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid var(--line);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
    color: var(--text2);
  }
  .wx b {
    color: var(--text);
    font-size: 15px;
  }
  .env {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    flex-shrink: 0;
  }
  .env-c {
    padding: 10px 10px;
    border-radius: 16px;
    background: var(--surface);
    border: 1px solid var(--line);
  }
  .env-c .k {
    font-size: 11px;
    color: var(--text2);
  }
  .env-c .v {
    font-size: 17px;
    font-weight: 700;
    margin-top: 3px;
    font-variant-numeric: tabular-nums;
  }
  .env-c .v.ok {
    color: var(--ok);
  }

  /* SmartAgent Feed & Question */
  .feed {
    padding: 13px 15px;
    border-radius: 18px;
    background: linear-gradient(160deg, rgba(124, 140, 255, 0.16), rgba(17, 26, 43, 0.92));
    border: 1px solid rgba(124, 140, 255, 0.28);
    display: flex;
    flex-direction: column;
    gap: 7px;
    flex-shrink: 0;
  }
  .feed .tag {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 11px;
    color: var(--primary);
    font-weight: 700;
    letter-spacing: 0.4px;
  }
  .feed .msg {
    font-size: 13px;
    line-height: 1.42;
    color: var(--text);
  }
  .feed .acts {
    display: flex;
    gap: 8px;
    margin-top: 2px;
  }
  .chip-btn {
    height: 32px;
    padding: 0 12px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.08);
    color: var(--text);
    border: 1px solid var(--line);
  }
  .chip-btn.pri {
    background: var(--primary);
    color: #fff;
    border-color: transparent;
  }
  .chip-btn:active {
    transform: scale(0.97);
  }

  .q {
    padding: 13px 15px;
    border-radius: 18px;
    background: var(--surface);
    border: 1px solid rgba(246, 199, 106, 0.35);
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex-shrink: 0;
  }
  .q .hd {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: var(--warn);
    font-weight: 700;
  }
  .q .qt {
    font-size: 13px;
    line-height: 1.4;
  }
  .q .acts {
    display: flex;
    gap: 6px;
  }

  /* Bottom Voice Trigger */
  .voice {
    margin-top: auto;
    height: 70px;
    border-radius: 20px;
    padding: 0 16px;
    background: linear-gradient(135deg, rgba(124, 140, 255, 0.24), rgba(56, 213, 245, 0.16));
    border: 1px solid rgba(124, 140, 255, 0.4);
    display: flex;
    align-items: center;
    gap: 14px;
    text-align: left;
    flex-shrink: 0;
  }
  .orb {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    flex-shrink: 0;
    background: radial-gradient(circle at 35% 30%, #fff, var(--cyan) 40%, var(--primary) 78%);
    box-shadow: 0 0 24px rgba(56, 213, 245, 0.55);
    animation: pulse 3s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.06); }
  }
  .voice .t1 {
    font-size: 15px;
    font-weight: 700;
  }
  .voice .t2 {
    font-size: 12px;
    color: var(--text2);
    margin-top: 2px;
  }

  /* ===== Right Main Control ===== */
  .main {
    padding: 18px 24px 18px 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-width: 0;
    min-height: 0;
    overflow: hidden;
  }

  .rhead {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    flex-shrink: 0;
  }
  .rhead h2 {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
  }
  .rhead .meta {
    display: flex;
    gap: 8px;
    align-items: center;
    flex-wrap: wrap;
  }
  .pill {
    height: 32px;
    padding: 0 12px;
    border-radius: 999px;
    background: var(--surface);
    border: 1px solid var(--line);
    font-size: 12px;
    color: var(--text2);
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .pill.occ {
    color: var(--ok);
    border-color: rgba(76, 215, 176, 0.35);
    background: rgba(76, 215, 176, 0.1);
  }

  /* Scenes Row */
  .scenes {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    padding-bottom: 2px;
    scrollbar-width: none;
    flex-shrink: 0;
  }
  .scenes::-webkit-scrollbar {
    display: none;
  }
  .scene {
    position: relative;
    overflow: hidden;
    min-width: 156px;
    height: 84px;
    padding: 12px 15px;
    border-radius: 18px;
    background: var(--surface);
    border: 1px solid var(--line);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left;
    flex-shrink: 0;
  }
  .scene:active {
    transform: scale(0.98);
  }
  .scene .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .scene .nm {
    font-size: 15px;
    font-weight: 700;
  }
  .scene .ds {
    font-size: 11px;
    color: var(--text2);
  }
  .scene.hold {
    border-color: rgba(246, 199, 106, 0.32);
  }
  .scene .bar {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 100%;
    width: 0%;
    background: rgba(246, 199, 106, 0.22);
    pointer-events: none;
    transition: width 0.05s linear;
  }

  /* Scrollable Content Area */
  .scroll {
    flex: 1;
    overflow-y: auto;
    padding-right: 4px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    min-height: 0;
  }
  .scroll::-webkit-scrollbar {
    width: 4px;
  }
  .scroll::-webkit-scrollbar-thumb {
    background: var(--line);
    border-radius: 4px;
  }

  .sec-t {
    font-size: 13px;
    color: var(--text2);
    font-weight: 600;
    margin: 2px 0 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /* All-home Room Cards Grid */
  .rooms {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
  .rcard {
    height: 150px;
    padding: 15px 16px;
    border-radius: 20px;
    background: var(--surface);
    border: 1px solid var(--line);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left;
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }
  .rcard.has-on {
    background: linear-gradient(155deg, rgba(255, 181, 71, 0.16), var(--surface) 68%);
    border-color: rgba(255, 181, 71, 0.35);
  }
  .rcard .top-r {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .rcard .rn {
    font-size: 18px;
    font-weight: 700;
  }
  .rcard .occ {
    font-size: 11px;
    color: var(--text3);
  }
  .rcard .occ.on {
    color: var(--ok);
    font-weight: 600;
  }
  .rcard .env-mini {
    font-size: 13px;
    color: var(--text2);
    font-variant-numeric: tabular-nums;
  }
  .rcard .quick {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .qpill {
    height: 34px;
    padding: 0 12px;
    border-radius: 11px;
    background: var(--surface2);
    border: 1px solid var(--line);
    font-size: 12px;
    font-weight: 600;
    color: var(--text2);
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .qpill.on {
    background: var(--amber);
    color: #1d1404;
    border-color: transparent;
  }

  /* Device Tile Grid */
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
  }
  .tile {
    position: relative;
    overflow: hidden;
    height: 132px;
    padding: 14px 15px;
    border-radius: 20px;
    background: var(--surface);
    border: 1px solid var(--line);
    color: var(--text);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left;
    transition: transform 0.12s, background 0.18s;
    touch-action: none;
    cursor: pointer;
  }
  .tile:active {
    transform: scale(0.985);
  }
  .tile.on {
    background: var(--tile-on);
    color: var(--tile-on-text);
    border-color: transparent;
    box-shadow: 0 10px 26px rgba(0, 0, 0, 0.25);
  }
  .tile .fill {
    position: absolute;
    inset: 0 auto 0 0;
    width: 0%;
    background: linear-gradient(90deg, rgba(255, 181, 71, 0.38), rgba(255, 181, 71, 0.14));
    pointer-events: none;
    transition: width 0.08s;
  }
  .tile > * {
    position: relative;
    z-index: 1;
  }
  .tile .th {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tile .ic {
    width: 38px;
    height: 38px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.07);
    display: grid;
    place-items: center;
    color: var(--text2);
  }
  .tile.on .ic {
    background: rgba(18, 23, 38, 0.09);
    color: #d98200;
  }
  .tile.on.cool .ic {
    color: #1677ff;
  }
  .tile .more {
    width: 30px;
    height: 30px;
    border-radius: 9px;
    display: grid;
    place-items: center;
    color: var(--text3);
    font-size: 16px;
  }
  .tile.on .more {
    color: var(--tile-on-sub);
  }
  .tile .rm {
    font-size: 11px;
    color: var(--text2);
  }
  .tile.on .rm {
    color: var(--tile-on-sub);
  }
  .tile .nm {
    font-size: 15px;
    font-weight: 700;
    margin-top: 1px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .tile .st {
    font-size: 12px;
    color: var(--text2);
    margin-top: 2px;
    font-variant-numeric: tabular-nums;
  }
  .tile.on .st {
    color: var(--tile-on-sub);
    font-weight: 600;
  }
  .tile.offline {
    opacity: 0.48;
  }

  /* Truthful command receipt badge on tile */
  .badge {
    height: 22px;
    padding: 0 8px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }
  .badge.sending {
    background: rgba(56, 213, 245, 0.18);
    color: var(--cyan);
  }
  .badge.ok {
    background: rgba(76, 215, 176, 0.2);
    color: var(--ok);
  }
  .badge.unknown {
    background: rgba(246, 199, 106, 0.22);
    color: var(--warn);
  }
  .spin {
    width: 10px;
    height: 10px;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: sp 0.7s linear infinite;
    display: inline-block;
  }
  @keyframes sp {
    to { transform: rotate(360deg); }
  }

  /* ===== Background Music Page & Now Playing Dock ===== */
  .dock {
    height: 76px;
    padding: 10px 16px;
    border-radius: 20px;
    background: linear-gradient(135deg, rgba(124, 140, 255, 0.2), rgba(17, 26, 43, 0.96) 65%);
    border: 1px solid rgba(124, 140, 255, 0.35);
    display: flex;
    align-items: center;
    gap: 14px;
    flex-shrink: 0;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .dock .cov {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    color: #fff;
    background: linear-gradient(135deg, #6b7cff, #38d5f5);
    box-shadow: 0 6px 16px rgba(56, 213, 245, 0.28);
  }
  .dock .meta {
    min-width: 0;
    flex: 1;
  }
  .dock .tt {
    font-size: 15px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .dock .ar {
    font-size: 12px;
    color: var(--text2);
    margin-top: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .dock .zones {
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
  }
  .dock .zchip {
    height: 26px;
    padding: 0 10px;
    border-radius: 999px;
    font-size: 11px;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.08);
    color: var(--text);
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }
  .dock .ctrls {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .dock .cbtn {
    width: 42px;
    height: 42px;
    border-radius: 13px;
    background: rgba(255, 255, 255, 0.08);
    display: grid;
    place-items: center;
    color: var(--text);
  }
  .dock .cbtn.pri {
    background: var(--primary);
    color: #fff;
  }
  .dock .p {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--cyan));
  }

  .mpage {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 14px;
    flex: 1;
    min-height: 0;
  }
  .mcol {
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-height: 0;
    overflow-y: auto;
    padding-right: 2px;
  }
  .mnow {
    padding: 20px;
    border-radius: 24px;
    background:
      radial-gradient(420px 240px at 15% 15%, rgba(124, 140, 255, 0.28), transparent 70%),
      radial-gradient(360px 220px at 90% 90%, rgba(56, 213, 245, 0.18), transparent 70%),
      var(--surface);
    border: 1px solid var(--line);
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  .mhero {
    display: flex;
    gap: 18px;
    align-items: center;
  }
  .mcover {
    width: 132px;
    height: 132px;
    border-radius: 24px;
    flex-shrink: 0;
    background: linear-gradient(135deg, #7c8cff, #38d5f5 60%, #4cd7b0);
    box-shadow: 0 16px 34px rgba(0, 0, 0, 0.35);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 14px;
    color: #071224;
    font-weight: 800;
  }
  .mcover .tag {
    font-size: 11px;
    opacity: 0.78;
  }
  .mcover .big {
    font-size: 20px;
    line-height: 1.15;
  }
  .mmeta {
    min-width: 0;
    flex: 1;
  }
  .mmeta .src {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 26px;
    padding: 0 10px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.08);
    font-size: 11px;
    color: var(--text2);
  }
  .mmeta .tt {
    font-size: 24px;
    font-weight: 700;
    margin-top: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .mmeta .ar {
    font-size: 14px;
    color: var(--text2);
    margin-top: 4px;
  }
  .mmeta .sub {
    font-size: 12px;
    color: var(--ok);
    margin-top: 8px;
  }

  .seek {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .seek-bar {
    height: 10px;
    border-radius: 999px;
    background: var(--surface2);
    position: relative;
    overflow: hidden;
    cursor: pointer;
    touch-action: none;
  }
  .seek-fill {
    position: absolute;
    inset: 0 auto 0 0;
    background: linear-gradient(90deg, var(--primary), var(--cyan));
  }
  .seek-time {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: var(--text2);
    font-variant-numeric: tabular-nums;
  }

  .mctrl {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .mcbtn {
    width: 52px;
    height: 52px;
    border-radius: 16px;
    background: var(--surface2);
    border: 1px solid var(--line);
    display: grid;
    place-items: center;
    color: var(--text);
  }
  .mcbtn.on {
    color: var(--primary);
    border-color: var(--primary);
    background: rgba(124, 140, 255, 0.14);
  }
  .mcbtn.play {
    width: 72px;
    height: 60px;
    border-radius: 20px;
    background: var(--primary);
    color: #fff;
    border: 0;
    box-shadow: 0 10px 24px rgba(124, 140, 255, 0.4);
  }
  .mvol {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .mvol .bar {
    flex: 1;
    height: 36px;
    border-radius: 12px;
    background: var(--surface2);
    border: 1px solid var(--line);
    position: relative;
    overflow: hidden;
    cursor: pointer;
    touch-action: none;
  }
  .mvol .fill {
    position: absolute;
    inset: 0 auto 0 0;
    background: linear-gradient(90deg, var(--primary), var(--cyan));
    opacity: 0.55;
  }
  .mvol .lbl {
    position: relative;
    z-index: 1;
    height: 100%;
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    font-weight: 600;
  }

  .pl-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  .plc {
    padding: 13px 14px;
    border-radius: 18px;
    background: var(--surface);
    border: 1px solid var(--line);
    display: flex;
    align-items: center;
    gap: 12px;
    text-align: left;
    cursor: pointer;
  }
  .plc.on {
    border-color: var(--primary);
    background: linear-gradient(135deg, rgba(124, 140, 255, 0.2), var(--surface));
  }
  .plc .sw {
    width: 44px;
    height: 44px;
    border-radius: 13px;
    flex-shrink: 0;
    display: grid;
    place-items: center;
    color: #fff;
    font-weight: 800;
  }
  .plc .nm {
    font-size: 14px;
    font-weight: 700;
  }
  .plc .ds {
    font-size: 11px;
    color: var(--text2);
    margin-top: 2px;
  }

  .mzones {
    padding: 16px;
    border-radius: 22px;
    background: var(--surface);
    border: 1px solid var(--line);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .zrow {
    padding: 11px 12px;
    border-radius: 16px;
    background: var(--surface2);
    border: 1px solid var(--line);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .zrow.on {
    border-color: rgba(124, 140, 255, 0.45);
    background: linear-gradient(135deg, rgba(124, 140, 255, 0.14), var(--surface2));
  }
  .zrow.offline {
    opacity: 0.45;
  }
  .ztop {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }
  .ztop .nm {
    font-size: 14px;
    font-weight: 700;
  }
  .ztop .st {
    font-size: 11px;
    color: var(--text2);
  }
  .tgl {
    width: 48px;
    height: 28px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.12);
    position: relative;
    transition: 0.18s;
  }
  .tgl::after {
    content: "";
    position: absolute;
    top: 3px;
    left: 3px;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background: #fff;
    transition: 0.18s;
  }
  .tgl.on {
    background: var(--primary);
  }
  .tgl.on::after {
    left: 23px;
  }
  .zvol {
    height: 28px;
    border-radius: 9px;
    background: rgba(0, 0, 0, 0.22);
    position: relative;
    overflow: hidden;
    cursor: pointer;
    touch-action: none;
  }
  .zvol .fill {
    position: absolute;
    inset: 0 auto 0 0;
    background: linear-gradient(90deg, var(--primary), var(--cyan));
    opacity: 0.55;
  }
  .zvol .lbl {
    position: relative;
    z-index: 1;
    height: 100%;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 11px;
    color: var(--text2);
  }

  /* Room Speaker Tile */
  .tile.spk.on {
    background: linear-gradient(145deg, #232b4e, #172236);
    color: #eef1f8;
    border-color: rgba(124, 140, 255, 0.5);
  }
  .tile.spk.on .rm,
  .tile.spk.on .st,
  .tile.spk.on .more {
    color: #9aa6bd;
  }
  .tile.spk.on .ic {
    background: rgba(124, 140, 255, 0.22);
    color: var(--cyan);
  }
  .tile.spk .fill {
    background: linear-gradient(90deg, rgba(124, 140, 255, 0.42), rgba(56, 213, 245, 0.16));
  }

  /* Environment Alert Banner */
  .alert {
    padding: 12px 16px;
    border-radius: 16px;
    background: rgba(246, 199, 106, 0.12);
    border: 1px solid rgba(246, 199, 106, 0.35);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
  }
  .alert b {
    color: var(--warn);
  }

  /* ===== Slide-out Detail Sheet ===== */
  .sheet-mask {
    position: absolute;
    inset: 0;
    background: rgba(4, 8, 16, 0.58);
    backdrop-filter: blur(8px);
    opacity: 0;
    pointer-events: none;
    transition: 0.22s;
    z-index: 30;
    display: flex;
    justify-content: flex-end;
  }
  .sheet-mask.open {
    opacity: 1;
    pointer-events: auto;
  }
  .sheet {
    width: 460px;
    height: 100%;
    background: var(--bg2);
    border-left: 1px solid var(--line);
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    transform: translateX(100%);
    transition: 0.24s cubic-bezier(0.2, 0.9, 0.2, 1);
    overflow-y: auto;
  }
  .sheet-mask.open .sheet {
    transform: translateX(0);
  }
  .sheet-hd {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .sheet-hd .tt {
    font-size: 20px;
    font-weight: 700;
  }
  .sheet-hd .sub {
    font-size: 12px;
    color: var(--text2);
    margin-top: 2px;
  }

  /* Light vertical slider in sheet */
  .vslider-wrap {
    display: flex;
    gap: 22px;
    align-items: center;
    justify-content: center;
    margin: 10px 0;
  }
  .vslider {
    width: 150px;
    height: 330px;
    border-radius: 34px;
    background: var(--surface);
    border: 1px solid var(--line);
    position: relative;
    overflow: hidden;
    touch-action: none;
    cursor: pointer;
  }
  .vslider .vfill {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50%;
    background: linear-gradient(180deg, #ffd27d, #ff9f2e);
    transition: height 0.06s;
  }
  .vslider .vlbl {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 22px 0;
    font-weight: 700;
    font-size: 22px;
    mix-blend-mode: difference;
    color: #fff;
  }
  .ct-row {
    display: flex;
    gap: 10px;
    justify-content: center;
  }
  .ct {
    width: 58px;
    height: 58px;
    border-radius: 18px;
    border: 2px solid transparent;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
    color: #1b1b1b;
  }
  .ct.sel {
    border-color: var(--text);
  }

  /* Climate Dial in sheet */
  .dial {
    width: 270px;
    height: 270px;
    margin: 6px auto;
    position: relative;
    display: grid;
    place-items: center;
  }
  .dial svg {
    position: absolute;
    inset: 0;
  }
  .dial .temp {
    font-size: 56px;
    font-weight: 300;
    font-variant-numeric: tabular-nums;
  }
  .dial .sub {
    font-size: 13px;
    color: var(--text2);
    text-align: center;
  }
  .step-row {
    display: flex;
    justify-content: center;
    gap: 18px;
  }
  .rbtn {
    width: 64px;
    height: 64px;
    border-radius: 20px;
    background: var(--surface);
    border: 1px solid var(--line);
    font-size: 26px;
    font-weight: 600;
  }
  .seg {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }
  .seg button {
    height: 50px;
    border-radius: 14px;
    background: var(--surface);
    border: 1px solid var(--line);
    font-size: 13px;
    font-weight: 600;
    color: var(--text2);
  }
  .seg button.on {
    background: var(--primary);
    color: #fff;
    border-color: transparent;
  }

  /* Curtain visual */
  .curtain-vis {
    height: 200px;
    border-radius: 20px;
    background: linear-gradient(180deg, #6fa8dc, #1e2f4d);
    position: relative;
    overflow: hidden;
    border: 1px solid var(--line);
  }
  .pane {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 30%;
    background: repeating-linear-gradient(90deg, #263654 0 12px, #1c2942 12px 24px);
    transition: width 0.2s;
  }
  .pane.r {
    right: 0;
  }
  .hslider {
    height: 52px;
    border-radius: 16px;
    background: var(--surface);
    border: 1px solid var(--line);
    position: relative;
    overflow: hidden;
    touch-action: none;
    cursor: pointer;
  }
  .hslider .hfill {
    position: absolute;
    inset: 0 auto 0 0;
    background: linear-gradient(90deg, var(--primary), var(--cyan));
    opacity: 0.45;
  }
  .hslider .hlbl {
    position: relative;
    z-index: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 18px;
    font-weight: 700;
  }

  .sheet-foot {
    margin-top: auto;
    padding: 14px;
    border-radius: 16px;
    background: var(--surface);
    border: 1px solid var(--line);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
    color: var(--text2);
  }

  /* ===== Voice Overlay ===== */
  .vo {
    position: absolute;
    inset: 0;
    z-index: 40;
    background: radial-gradient(600px 400px at 50% 42%, rgba(124, 140, 255, 0.28), rgba(6, 10, 19, 0.94) 70%);
    backdrop-filter: blur(14px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 22px;
    opacity: 0;
    pointer-events: none;
    transition: 0.22s;
  }
  .vo.open {
    opacity: 1;
    pointer-events: auto;
  }
  .vorb {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 30%, #fff, var(--cyan) 42%, var(--primary) 78%);
    box-shadow: 0 0 80px rgba(56, 213, 245, 0.65);
    animation: pulse 1.8s ease-in-out infinite;
  }
  .vsteps {
    display: flex;
    gap: 10px;
  }
  .vstep {
    height: 34px;
    padding: 0 14px;
    border-radius: 999px;
    background: var(--surface);
    border: 1px solid var(--line);
    font-size: 13px;
    color: var(--text2);
    display: inline-flex;
    align-items: center;
  }
  .vstep.on {
    background: var(--primary);
    color: #fff;
    border-color: transparent;
  }
  .vtranscript {
    font-size: 26px;
    font-weight: 600;
    min-height: 36px;
    text-align: center;
    padding: 0 32px;
  }
  .vreply {
    font-size: 16px;
    color: var(--ok);
    min-height: 24px;
    text-align: center;
    padding: 0 32px;
  }

  /* ===== Ambient Screensaver ===== */
  .saver {
    position: absolute;
    inset: 0;
    z-index: 50;
    background: #020409;
    color: #dde3f0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 56px 64px;
    opacity: 0;
    pointer-events: none;
    transition: 0.35s;
    cursor: pointer;
  }
  .saver.open {
    opacity: 1;
    pointer-events: auto;
  }
  .saver .big-t {
    font-size: 168px;
    font-weight: 200;
    letter-spacing: -6px;
    line-height: 1;
    font-variant-numeric: tabular-nums;
  }
  .saver .big-d {
    font-size: 22px;
    color: #7d89a3;
    margin-top: 10px;
  }
  .saver .bot {
    display: flex;
    gap: 36px;
    font-size: 18px;
    color: #8b96ad;
  }
  .saver .bot b {
    color: #eef1f8;
  }

  /* ===== Settings / Pairing Drawer ===== */
  .settings-section {
    padding: 16px;
    border-radius: 18px;
    background: var(--surface);
    border: 1px solid var(--line);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .settings-section h4 {
    margin: 0;
    font-size: 14px;
    color: var(--text);
  }
  .settings-input {
    width: 100%;
    height: 42px;
    padding: 0 12px;
    border-radius: 12px;
    background: var(--surface2);
    border: 1px solid var(--line);
    color: var(--text);
    font-size: 13px;
    user-select: text;
  }

  /* ===== V5 Mobile Client Adaptive Mode (.screen.mobile-mode) ===== */
  .screen.mobile-mode {
    display: flex;
    flex-direction: column;
    max-width: 480px;
    margin: 0 auto;
    border-left: 1px solid var(--line);
    border-right: 1px solid var(--line);
    box-shadow: 0 0 60px rgba(0, 0, 0, 0.55);
  }
  @media (max-width: 820px) {
    .screen.mobile-mode {
      max-width: 100%;
      border-left: none;
      border-right: none;
    }
  }
  .m-shell {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
    min-height: 0;
    position: relative;
    overflow: hidden;
  }
  .m-shell.elder {
    font-size: 112%;
  }
  .m-header {
    height: 60px;
    padding: 0 14px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid var(--line);
    background: rgba(10, 17, 32, 0.78);
    backdrop-filter: blur(14px);
    flex-shrink: 0;
  }
  :host([data-theme='light']) .m-header {
    background: rgba(255, 255, 255, 0.85);
  }
  .m-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }
  .m-brand .dot {
    background: linear-gradient(135deg, var(--primary), var(--cyan));
    color: #fff;
    display: grid;
    place-items: center;
    font-weight: 800;
    flex-shrink: 0;
  }
  .m-b-title {
    font-size: 15px;
    font-weight: 800;
    line-height: 1.15;
  }
  .m-b-sub {
    font-size: 11px;
    color: var(--text2);
    margin-top: 2px;
  }
  .m-hdr-right {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-shrink: 0;
  }
  .status-pill {
    height: 28px;
    padding: 0 10px;
    border-radius: 999px;
    background: var(--surface);
    border: 1px solid var(--line);
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 600;
    color: var(--text2);
  }
  .sdot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--ok);
    box-shadow: 0 0 8px var(--ok);
  }
  .sdot.warn {
    background: var(--warn);
    box-shadow: 0 0 8px var(--warn);
  }
  .sdot.bad {
    background: var(--bad);
    box-shadow: 0 0 8px var(--bad);
  }
  .m-ibtn {
    width: 34px;
    height: 34px;
    border-radius: 10px;
    font-size: 14px;
  }

  .m-viewport {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    padding: 12px 14px 136px;
    scrollbar-width: none;
  }
  .m-viewport::-webkit-scrollbar {
    display: none;
  }
  .m-tab-body {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .m-room-pills {
    display: flex;
    gap: 7px;
    overflow-x: auto;
    scrollbar-width: none;
    padding-bottom: 2px;
  }
  .m-room-pills::-webkit-scrollbar {
    display: none;
  }
  .m-rpill {
    height: 34px;
    padding: 0 13px;
    border-radius: 999px;
    background: var(--surface);
    border: 1px solid var(--line);
    color: var(--text2);
    font-size: 12px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
    flex-shrink: 0;
  }
  .m-rpill.active {
    background: var(--primary);
    color: #fff;
    border-color: transparent;
    box-shadow: 0 6px 14px rgba(124, 140, 255, 0.34);
  }
  .m-occ-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--ok);
    display: inline-block;
  }

  .m-env-strip {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 5px;
    padding: 8px 6px;
    border-radius: 16px;
    background: var(--surface);
    border: 1px solid var(--line);
  }
  .m-env-cell {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 2px;
  }
  .m-env-cell .k {
    font-size: 10px;
    color: var(--text3);
  }
  .m-env-cell .v {
    font-size: 12px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
  }
  .m-env-cell .v.ok {
    color: var(--ok);
  }
  .m-env-cell .v.amber {
    color: var(--amber);
  }

  .m-sec-hd {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-top: 2px;
    font-size: 13px;
    font-weight: 700;
  }
  .m-sec-hd .sub {
    font-size: 11px;
    font-weight: 500;
    color: var(--text3);
  }

  .m-scenes .m-scene {
    min-width: 138px;
    height: 78px;
    padding: 10px 12px;
  }

  .m-room-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 9px;
  }
  .m-rcard {
    padding: 11px 12px;
    border-radius: 18px;
    background: var(--surface);
    border: 1px solid var(--line);
    display: flex;
    flex-direction: column;
    gap: 9px;
    cursor: pointer;
  }
  .m-rcard.lit {
    border-color: rgba(255, 181, 71, 0.35);
    background: linear-gradient(160deg, rgba(255, 181, 71, 0.1), var(--surface) 75%);
  }
  .m-rcard.rest {
    border-color: rgba(124, 140, 255, 0.42);
    background: linear-gradient(160deg, rgba(124, 140, 255, 0.14), var(--surface) 80%);
  }
  .m-rc-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .m-rc-name {
    font-size: 14px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .m-rc-env {
    font-size: 11px;
    color: var(--text2);
    margin-top: 2px;
  }
  .m-rc-cnt {
    font-size: 10px;
    color: var(--text3);
  }
  .m-rc-actions {
    display: flex;
    gap: 6px;
  }
  .m-mini-pill {
    flex: 1;
    height: 27px;
    border-radius: 8px;
    background: var(--surface2);
    border: 1px solid var(--line);
    color: var(--text2);
    font-size: 11px;
    font-weight: 600;
    padding: 0 6px;
    white-space: nowrap;
  }
  .m-mini-pill.lit {
    background: rgba(255, 181, 71, 0.2);
    color: var(--amber);
    border-color: rgba(255, 181, 71, 0.4);
  }
  .m-mini-pill.rest {
    background: rgba(124, 140, 255, 0.24);
    color: #c2cbff;
    border-color: rgba(124, 140, 255, 0.45);
  }

  .m-tile-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 9px;
  }
  .m-tile {
    min-height: 98px;
    padding: 11px 12px;
  }
  .m-tile .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    z-index: 1;
  }
  .m-tile .ico {
    width: 34px;
    height: 34px;
    border-radius: 11px;
    background: rgba(255, 255, 255, 0.07);
    display: grid;
    place-items: center;
    color: var(--text);
  }
  .m-tile.on .ico {
    background: rgba(18, 23, 38, 0.1);
    color: #121726;
  }
  .m-badge {
    font-size: 10px;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 6px;
  }
  .m-badge.ok {
    background: rgba(76, 215, 176, 0.2);
    color: var(--ok);
  }
  .m-badge.wait {
    background: rgba(56, 213, 245, 0.2);
    color: var(--cyan);
  }
  .m-badge.warn {
    background: rgba(246, 199, 106, 0.22);
    color: var(--warn);
  }
  .m-badge.off {
    background: rgba(255, 123, 123, 0.2);
    color: var(--bad);
  }
  .m-badge.lock {
    background: rgba(124, 140, 255, 0.18);
    color: var(--primary);
  }

  .m-room-hero {
    padding: 13px 14px;
    border-radius: 18px;
    background: var(--surface);
    border: 1px solid var(--line);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .m-rh-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 8px;
  }
  .m-rh-title {
    font-size: 16px;
    font-weight: 800;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .m-rh-sub {
    font-size: 11px;
    color: var(--text2);
    margin-top: 4px;
    line-height: 1.4;
  }
  .m-rh-Presets {
    display: flex;
    gap: 7px;
    flex-wrap: wrap;
  }

  /* Steward & Activity & Inbox */
  .m-sub-seg {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6px;
    padding: 4px;
    border-radius: 14px;
    background: var(--surface);
    border: 1px solid var(--line);
  }
  .m-sub-seg button {
    height: 34px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 700;
    color: var(--text2);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }
  .m-sub-seg button.on {
    background: var(--primary);
    color: #fff;
  }
  .m-cnt-dot {
    padding: 1px 6px;
    border-radius: 999px;
    background: var(--warn);
    color: #141824;
    font-size: 10px;
    font-weight: 800;
  }
  .m-filter-row {
    display: flex;
    gap: 6px;
  }
  .m-fpill {
    height: 28px;
    padding: 0 11px;
    border-radius: 999px;
    background: var(--surface);
    border: 1px solid var(--line);
    font-size: 11px;
    font-weight: 600;
    color: var(--text2);
  }
  .m-fpill.on {
    background: rgba(124, 140, 255, 0.22);
    color: var(--text);
    border-color: var(--primary);
  }
  .m-chain-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .m-chain-card {
    padding: 12px 13px;
    border-radius: 18px;
    background: var(--surface);
    border: 1px solid var(--line);
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .m-chain-card.unknown {
    border-color: rgba(246, 199, 106, 0.4);
  }
  .m-chain-card.blocked {
    border-color: rgba(255, 123, 123, 0.4);
  }
  .m-cc-hd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }
  .m-cc-room {
    font-size: 10px;
    font-weight: 700;
    padding: 2px 7px;
    border-radius: 6px;
    background: var(--surface2);
    color: var(--text2);
    margin-right: 6px;
  }
  .m-cc-title {
    font-size: 13px;
    font-weight: 700;
  }
  .m-cc-status {
    font-size: 11px;
    font-weight: 700;
  }
  .m-cc-status.ok {
    color: var(--ok);
  }
  .m-cc-status.unknown {
    color: var(--warn);
  }
  .m-cc-status.blocked {
    color: var(--bad);
  }
  .m-cc-time {
    font-size: 11px;
    color: var(--text3);
  }
  .m-ladder {
    display: flex;
    flex-direction: column;
    gap: 5px;
    padding: 8px 10px;
    border-radius: 12px;
    background: var(--surface2);
    font-size: 11px;
  }
  .m-step {
    display: flex;
    justify-content: space-between;
    gap: 10px;
  }
  .m-step .k {
    color: var(--text3);
    flex-shrink: 0;
  }
  .m-step .v {
    color: var(--text);
    text-align: right;
    word-break: break-all;
  }
  .m-step .v.code {
    font-family: monospace;
    color: var(--cyan);
  }
  .m-step .v.ok {
    color: var(--ok);
    font-weight: 700;
  }
  .m-step .v.unknown {
    color: var(--warn);
    font-weight: 700;
  }
  .m-step .v.blocked {
    color: var(--bad);
    font-weight: 700;
  }

  .m-inbox-card {
    padding: 13px 14px;
    border-radius: 18px;
    background: var(--surface);
    border: 1px solid var(--line);
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .m-inbox-card.resolved {
    opacity: 0.62;
  }
  .m-ic-top {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
  }
  .m-ic-tag {
    font-weight: 700;
    color: var(--primary);
  }
  .m-ic-tag.warn {
    color: var(--warn);
  }
  .m-ic-time {
    color: var(--text3);
  }
  .m-ic-title {
    font-size: 14px;
    font-weight: 700;
  }
  .m-ic-desc {
    font-size: 12px;
    color: var(--text2);
    line-height: 1.4;
  }
  .m-ic-done {
    font-size: 11px;
    color: var(--ok);
    font-weight: 700;
    margin-top: 4px;
  }

  /* Chat & NL Scene */
  .m-chat-box,
  .m-nl-card {
    padding: 13px 14px;
    border-radius: 18px;
    background: var(--surface);
    border: 1px solid var(--line);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .m-chat-msgs {
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 250px;
    overflow-y: auto;
  }
  .m-cmsg {
    display: flex;
    flex-direction: column;
    max-width: 86%;
  }
  .m-cmsg.user {
    align-self: flex-end;
    align-items: flex-end;
  }
  .m-cbubble {
    padding: 9px 12px;
    border-radius: 14px;
    background: var(--surface2);
    font-size: 12px;
    line-height: 1.45;
  }
  .m-cmsg.user .m-cbubble {
    background: var(--primary);
    color: #fff;
  }
  .m-ctime {
    font-size: 10px;
    color: var(--text3);
    margin-top: 2px;
  }
  .m-chat-Prompts {
    display: flex;
    gap: 6px;
    overflow-x: auto;
    scrollbar-width: none;
  }
  .m-cprompt {
    height: 28px;
    padding: 0 10px;
    border-radius: 999px;
    background: var(--surface2);
    border: 1px solid var(--line);
    font-size: 11px;
    color: var(--text2);
    white-space: nowrap;
  }
  .m-chat-input-row,
  .m-nl-input-row {
    display: flex;
    gap: 8px;
  }
  .m-nl-hd {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    font-weight: 700;
  }
  .m-nl-desc {
    font-size: 12px;
    color: var(--text2);
    line-height: 1.4;
  }
  .m-scene-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 9px;
  }
  .m-scene-card {
    min-width: 0;
    width: 100%;
    height: 82px;
  }
  .m-strategy-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .m-strat-item {
    padding: 12px 14px;
    border-radius: 16px;
    background: var(--surface);
    border: 1px solid var(--line);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
  }
  .m-st-title {
    font-size: 13px;
    font-weight: 700;
  }
  .m-st-desc {
    font-size: 11px;
    color: var(--text2);
    margin-top: 2px;
  }

  /* Guard & Music */
  .m-guard-banner {
    padding: 12px 14px;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(76, 215, 176, 0.14), rgba(17, 26, 43, 0.92));
    border: 1px solid rgba(76, 215, 176, 0.32);
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .m-gb-ico {
    font-size: 24px;
  }
  .m-gb-title {
    font-size: 13px;
    font-weight: 700;
    color: var(--ok);
  }
  .m-gb-sub {
    font-size: 11px;
    color: var(--text2);
    margin-top: 2px;
    line-height: 1.38;
  }
  .m-guard-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 9px;
  }
  .m-gcard {
    padding: 12px;
    border-radius: 16px;
    background: var(--surface);
    border: 1px solid var(--line);
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  .m-gc-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .m-gc-name {
    font-size: 12px;
    font-weight: 700;
  }
  .m-gc-val {
    font-size: 13px;
    font-weight: 800;
  }
  .m-gc-val.ok {
    color: var(--ok);
  }
  .m-gc-meta {
    font-size: 10px;
    color: var(--text3);
  }
  .m-music-card {
    padding: 13px 14px;
    border-radius: 18px;
    background: var(--surface);
    border: 1px solid var(--line);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .m-mc-top {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .m-mc-art {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: grid;
    place-items: center;
    font-size: 22px;
    color: #fff;
    flex-shrink: 0;
  }
  .m-mc-tag {
    font-size: 10px;
    color: var(--primary);
    font-weight: 700;
  }
  .m-mc-title {
    font-size: 14px;
    font-weight: 800;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .m-mc-sub {
    font-size: 11px;
    color: var(--text2);
  }
  .m-mc-ctrls {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .m-zone-chips {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 7px;
  }
  .m-zchip {
    height: 34px;
    padding: 0 10px;
    border-radius: 10px;
    background: var(--surface2);
    border: 1px solid var(--line);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 11px;
    color: var(--text2);
  }
  .m-zchip.on {
    border-color: var(--primary);
    background: rgba(124, 140, 255, 0.16);
    color: var(--text);
    font-weight: 700;
  }

  /* Floating Mini Music + Voice Bar & Bottom 4-Tab Nav */
  .m-float-dock {
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: 68px;
    z-index: 20;
    display: flex;
    gap: 8px;
    align-items: center;
  }
  .m-mini-player {
    flex: 1;
    min-width: 0;
    height: 48px;
    padding: 0 12px;
    border-radius: 16px;
    background: rgba(17, 26, 43, 0.92);
    backdrop-filter: blur(16px);
    border: 1px solid var(--line2);
    display: flex;
    align-items: center;
    gap: 9px;
    cursor: pointer;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  }
  :host([data-theme='light']) .m-mini-player {
    background: rgba(255, 255, 255, 0.92);
  }
  .m-mp-info {
    flex: 1;
    min-width: 0;
  }
  .m-mp-title {
    font-size: 12px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .m-mp-sub {
    font-size: 10px;
    color: var(--text2);
  }
  .m-mp-btn {
    width: 30px;
    height: 30px;
    border-radius: 9px;
    background: var(--surface2);
    color: var(--text);
    font-size: 12px;
    display: grid;
    place-items: center;
  }
  .m-voice-fab {
    height: 48px;
    padding: 0 13px;
    border-radius: 16px;
    background: linear-gradient(135deg, rgba(124, 140, 255, 0.32), rgba(56, 213, 245, 0.24));
    backdrop-filter: blur(16px);
    border: 1px solid rgba(124, 140, 255, 0.5);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 700;
    color: var(--text);
    flex-shrink: 0;
    box-shadow: 0 8px 24px rgba(56, 213, 245, 0.25);
  }
  .m-tabbar {
    height: 60px;
    border-top: 1px solid var(--line);
    background: rgba(10, 17, 32, 0.92);
    backdrop-filter: blur(16px);
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    flex-shrink: 0;
    z-index: 22;
  }
  :host([data-theme='light']) .m-tabbar {
    background: rgba(255, 255, 255, 0.94);
  }
  .m-tab-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3px;
    color: var(--text3);
    font-size: 11px;
    font-weight: 600;
  }
  .m-tab-btn .ico {
    font-size: 17px;
    position: relative;
  }
  .m-tab-btn.active {
    color: var(--primary);
    font-weight: 700;
  }
  .m-nav-dot {
    position: absolute;
    top: -2px;
    right: -6px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--warn);
  }

  /* Bottom Sheet adaptation when in mobile-mode */
  .screen.mobile-mode .sheet-mask {
    align-items: flex-end;
    justify-content: center;
  }
  .screen.mobile-mode .sheet {
    width: 100%;
    max-width: 480px;
    height: auto;
    max-height: 86vh;
    border-left: none;
    border-top: 1px solid var(--line2);
    border-radius: 26px 26px 0 0;
    transform: translateY(100%);
  }
  .screen.mobile-mode .sheet-mask.open .sheet {
    transform: translateY(0);
  }
`,C={bulb:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V18h6v-1.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2Z"/></svg>',ac:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="10" rx="3"/><path d="M6 19c1.5-1 1.5-3 0-4M12 19c1.5-1 1.5-3 0-4M18 19c1.5-1 1.5-3 0-4"/></svg>',curtain:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 4h18M5 4v16M9 4c0 6-2 10-4 12M19 4v16M15 4c0 6 2 10 4 12"/></svg>',tv:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>',fan:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="2"/><path d="M12 10V4a4 4 0 0 1 4 4c0 1.5-1 2-4 2Zm2 2h6a4 4 0 0 1-4 4c-1.5 0-2-1-2-4Zm-2 2v6a4 4 0 0 1-4-4c0-1.5 1-2 4-2Zm-2-2H4a4 4 0 0 1 4-4c1.5 0 2 1 2 4Z"/></svg>',lock:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>',plug:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 2v6M15 2v6M6 8h12v4a6 6 0 0 1-6 6v4"/></svg>',spark:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m12 3 2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2L12 3Z"/></svg>',speaker:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="3"/><circle cx="12" cy="14" r="4"/><circle cx="12" cy="6.5" r="1"/></svg>',play:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 5v14l12-7-12-7Z"/></svg>',pause:'<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',prev:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6V6Zm3.5 6 8.5 6V6l-8.5 6Z"/></svg>',next:'<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 6h2v12h-2V6ZM6 18l8.5-6L6 6v12Z"/></svg>',shuffle:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>',timer:'<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9 2h6"/></svg>',settings:'<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"/></svg>',sensor:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M5 5a10 10 0 0 0 0 14M19 5a10 10 0 0 1 0 14M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7"/></svg>',vacuum:'<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v3"/></svg>'};function le(){return{rooms:[{id:"living",name:"客厅",occ:!0,temp:24.5,hum:48},{id:"master",name:"主卧",occ:!0,temp:23.8,hum:50},{id:"second",name:"次卧",occ:!1,temp:24,hum:47},{id:"study",name:"书房",occ:!1,temp:24.2,hum:45},{id:"kitchen",name:"餐厨",occ:!1,temp:25.1,hum:52},{id:"bath",name:"卫生间",occ:!1,temp:24.8,hum:62},{id:"balcony",name:"阳台",occ:!1,temp:22.6,hum:55}],devs:[{id:"l_main",room:"living",name:"客厅主灯",type:"light",on:!0,bri:76,ct:4e3,dimmable:!0,supportsCt:!0,fav:!0},{id:"l_strip",room:"living",name:"沙发灯带",type:"light",on:!0,bri:45,ct:3e3,dimmable:!0,supportsCt:!0,fav:!0},{id:"l_spot",room:"living",name:"电视射灯",type:"light",on:!1,bri:60,ct:3500,dimmable:!0,supportsCt:!0},{id:"l_ac",room:"living",name:"客厅空调",type:"ac",on:!0,temp:25,mode:"制冷",fav:!0},{id:"l_cur",room:"living",name:"客厅纱帘",type:"curtain",on:!0,pos:70,fav:!0},{id:"l_tv",room:"living",name:"客厅电视",type:"tv",on:!1,sub:"待机"},{id:"l_air",room:"living",name:"新风净化器",type:"fan",on:!0,sub:"静音 · PM2.5 18"},{id:"l_lock",room:"living",name:"入户门锁",type:"lock",on:!0,sub:"已上锁 · 电量 86%",fav:!0},{id:"m_main",room:"master",name:"主卧吸顶灯",type:"light",on:!1,bri:70,ct:3500,dimmable:!1,supportsCt:!1},{id:"m_bed",room:"master",name:"床头壁灯",type:"light",on:!0,bri:28,ct:2700,dimmable:!1,supportsCt:!1,fav:!0},{id:"m_ac",room:"master",name:"主卧空调",type:"ac",on:!0,temp:24,mode:"睡眠",fav:!0},{id:"m_cur",room:"master",name:"主卧遮光帘",type:"curtain",on:!1,pos:0,fav:!0},{id:"s_main",room:"second",name:"次卧主灯",type:"light",on:!1,bri:80,ct:4e3,dimmable:!0,supportsCt:!0},{id:"s_ac",room:"second",name:"次卧空调",type:"ac",on:!1,temp:25,mode:"制冷"},{id:"s_cur",room:"second",name:"次卧窗帘",type:"curtain",on:!0,pos:100},{id:"st_lamp",room:"study",name:"书桌护眼灯",type:"light",on:!1,bri:85,ct:4500,dimmable:!0,supportsCt:!0},{id:"st_ac",room:"study",name:"书房空调",type:"ac",on:!1,temp:25,mode:"制冷"},{id:"st_plug",room:"study",name:"显示器插座",type:"plug",on:!0,sub:"功率 42W",failNext:!0},{id:"k_main",room:"kitchen",name:"餐厅吊灯",type:"light",on:!0,bri:65,ct:3e3,dimmable:!0,supportsCt:!0},{id:"k_cook",room:"kitchen",name:"操作台灯",type:"light",on:!1,bri:90,ct:4500,dimmable:!0,supportsCt:!0},{id:"k_Dish",room:"kitchen",name:"洗碗机",type:"plug",on:!1,sub:"已待机"},{id:"b_light",room:"bath",name:"镜前灯",type:"light",on:!1,bri:80,ct:4e3,dimmable:!1,supportsCt:!1},{id:"b_heat",room:"bath",name:"浴霸换气",type:"fan",on:!1,sub:"关闭",offline:!0},{id:"ba_light",room:"balcony",name:"阳台吸顶灯",type:"light",on:!1,bri:75,ct:4e3,dimmable:!1,supportsCt:!1},{id:"ba_win",room:"balcony",name:"电动晾衣架",type:"curtain",on:!0,pos:50}],scenes:[{id:"home",name:"回家",desc:"客厅开灯 · 空调 25° · 纱帘打开",room:"all"},{id:"away",name:"离家",desc:"全屋关灯 · 关闭空调 · 检查门窗",room:"all"},{id:"movie",name:"观影",desc:"主灯关闭 · 灯带 25% · 纱帘合上",room:"all"},{id:"sleep",name:"睡眠",desc:"主卧床头 15% · 遮光帘关闭 · 24°",room:"all"},{id:"night",name:"起夜",desc:"走廊与床头微光 12%",room:"all"},{id:"alloff",name:"全屋关灯",desc:"按住 1 秒确认执行",room:"all",hold:!0}],music:{linked:!0,source:"中控屏本机扬声器 · 内置环境音源",playing:!1,shuffle:!1,sleepMin:0,ducked:!1,receipt:null,playlistId:"jazz",trackIdx:0,pos:84,dur:228,masterVol:38,engineMode:"local_synth",streamUrl:"https://ice2.somafm.com/lush-128-mp3",searchQuery:"周杰伦",searching:!1,searchStatus:"无需厂家中转：输入歌手/歌名或对小智说「帮我播放周杰伦的晴天」即可直连在线曲库播放",haMediaEntities:[],selectedHaMediaId:"",zones:[{room:"screen",name:"中控屏本机扬声器",joined:!0,vol:38,online:!0}],playlists:[{id:"jazz",name:"傍晚爵士 · 暖光",desc:"慵懒萨克斯与钢琴 · 适合客厅与晚餐",color:"linear-gradient(135deg,#7C8CFF,#38D5F5)",tag:"JAZZ LOUNGE",tracks:[{t:"Blue in Green (Remastered)",a:"Miles Davis · Bill Evans",dur:228},{t:"Autumn Leaves · Live at Tokyo",a:"Chet Baker Quartet",dur:264},{t:"Waltz for Debby",a:"Bill Evans Trio",dur:242}]},{id:"morning",name:"清晨咖啡 · 轻快原声",desc:"木吉他与轻鼓点 · 唤醒全屋",color:"linear-gradient(135deg,#FFB547,#FF7B7B)",tag:"MORNING CAFE",tracks:[{t:"Sunday Coffee & Sunlight",a:"Norah & Acoustic Trio",dur:198},{t:"Bossa Nova Breeze",a:"Antonio Carlos",dur:215}]},{id:"focus",name:"书房专注 · 纯音乐",desc:"低干扰钢琴与环境弦乐",color:"linear-gradient(135deg,#4CD7B0,#38D5F5)",tag:"DEEP FOCUS",tracks:[{t:"Nuvole Bianche",a:"Ludovico Einaudi",dur:340},{t:"On the Nature of Daylight",a:"Max Richter",dur:372}]},{id:"sleep",name:"助眠白噪音 · 雨夜",desc:"细雨屋檐与远雷 · 可配合 30 分钟定时",color:"linear-gradient(135deg,#5B6CF0,#1E2F4D)",tag:"SLEEP SOUND",tracks:[{t:"森林细雨与壁炉微光",a:"SmartAgent Ambient",dur:600},{t:"海岸潮汐 · 低频放松",a:"SmartAgent Ambient",dur:600}]}]},questions:[{q:"你最近 4 天都在 23:15 左右关掉客厅主灯，以后需要我到点自动调暗吗？",eff:"已记住：每晚 23:15 自动调暗客厅主灯"},{q:"刚才把主卧空调从 26° 调到了 24°，要把 24° 设为睡眠默认温度吗？",eff:"已更新：主卧睡眠默认 24°"}],feed:{txt:"客厅有人且光线偏暗，已把沙发灯带调到 45%，未打扰主卧。",undone:!1,muted:!1}}}function N(e){const t=Math.max(0,Math.floor(e));return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}function H(e){return e.offline?e.type==="sensor"?"传感器离线":"设备离线 · 请检查电源":e.type==="sensor"?e.sub&&e.sub.trim()?e.sub:e.on?"已触发 · 活跃":"正常 · 待命":e.type==="vacuum"?e.sub&&e.sub.trim()?e.sub:e.on?"正在清扫":"已回充待命":e.on?e.type==="light"?e.dimmable?e.supportsCt?`亮度 ${e.bri??70}% · ${e.ct??4e3}K`:`亮度 ${e.bri??70}%`:"已开启":e.type==="ac"?`${e.mode??"制冷"} · ${e.temp??25}°`:e.type==="curtain"?`开启 ${e.pos??100}%`:e.sub||"开启中":e.type==="curtain"?"已关闭 · 0%":e.sub==="状态待回读"?"状态待回读":"已关闭"}function W(e){const t=String(e||"").trim().toLowerCase();return t==="ke_ting"||t==="客厅"||t==="living"?"living":t==="zhu_wo"||t==="主卧"||t==="master"?"master":t==="ci_wo"||t==="次卧"||t==="second"?"second":t==="shu_fang"||t==="书房"||t==="study"?"study":t==="chu_fang"||t==="厨房"||t==="餐厨"||t==="kitchen"?"kitchen":t==="can_ting"||t==="餐厅"||t==="dining"?"dining":t==="xuan_guan"||t==="玄关"||t==="entry"?"entry":t==="wo_shi"||t==="卧室"||t==="bedroom"?"bedroom":t==="chu_wu_shi"||t==="储物室"||t==="storage"?"storage":t.includes("卫生间")||t.includes("卫浴")||t==="bath"?"bath":t.includes("阳台")||t==="balcony"?"balcony":t||"living"}function Ie(e,t,i,s,a,n,d,c){var D,M,R,F,U,B,X;const r=Array.isArray(t)?t.filter(p=>p&&(p.managed||p.in_sa||p.in_smartagent)):[],h=[],g=new Set,y=Array.isArray(e)?e:[];for(const p of y){const T=String((p==null?void 0:p.name)||(p==null?void 0:p.id)||"").trim();if((!T||T==="默认房间"||(p==null?void 0:p.id)==="mo_ren_fang_jian")&&!r.some(I=>(I.room||I.area)===T||I.ha_area_id===(p==null?void 0:p.id)))continue;const S=W((p==null?void 0:p.id)||T);if(g.has(S))continue;g.add(S);const E=Array.isArray(t)?t.filter(w=>W((w==null?void 0:w.room)||(w==null?void 0:w.area)||(w==null?void 0:w.ha_area_id)||"")===S):[];let A=S==="master"?23.8:S==="living"?24.5:24,L=S==="master"?50:S==="living"?48:47;for(const w of E){const I=String((w==null?void 0:w.entity_id)||""),V=Number(w==null?void 0:w.state);Number.isFinite(V)&&(I.includes("temperature")||(w==null?void 0:w.device_class)==="temperature"?A=Math.round(V*10)/10:(I.includes("humidity")||(w==null?void 0:w.device_class)==="humidity")&&(L=Math.round(V)))}const P=E.some(w=>String(w==null?void 0:w.domain)==="binary_sensor"&&(String(w==null?void 0:w.entity_id).includes("occupancy")||String(w==null?void 0:w.entity_id).includes("ren_ti")||(w==null?void 0:w.device_class)==="occupancy"||(w==null?void 0:w.device_class)==="motion")&&String(w==null?void 0:w.state).toLowerCase()==="on"),j=(p==null?void 0:p.presence_state)==="occupied"||(p==null?void 0:p.occupancy_state)==="occupied"||P;h.push({id:S,name:T,occ:j,temp:A,hum:L})}h.sort((p,T)=>{const S=["living","master","second","kitchen","dining","entry","bedroom","storage"],E=S.indexOf(p.id),A=S.indexOf(T.id);return(E===-1?99:E)-(A===-1?99:A)});const k=[];for(const p of r){const T=String((p==null?void 0:p.entity_id)||(p==null?void 0:p.id)||"").trim();if(!T)continue;const S=String((p==null?void 0:p.domain)||T.split(".")[0]||"").toLowerCase();if(S==="sensor"&&(T.endsWith("_temperature")||T.endsWith("_humidity")||T.endsWith("_illuminance")))continue;const E=W((p==null?void 0:p.room)||(p==null?void 0:p.area)||(p==null?void 0:p.ha_area_id)||"living"),A=String((p==null?void 0:p.state)??"unknown").toLowerCase(),L=(p==null?void 0:p.available)===!1||A==="unavailable",P=!["off","unavailable","unknown","closed","idle","standby","docked"].includes(A),j=String((p==null?void 0:p.name)||(p==null?void 0:p.friendly_name)||T).trim();let w="plug",I,V,J,K=!1,Y=!1,ee,te,ie;if(S==="light"||S==="switch"&&j.includes("灯")){w="light";const G=((D=p==null?void 0:p.attributes)==null?void 0:D.brightness)??(p==null?void 0:p.brightness);K=S==="light"&&typeof G=="number",Y=!!((M=p==null?void 0:p.attributes)!=null&&M.color_temp_kelvin),V=typeof G=="number"?Math.round(G/255*100):P?80:50,J=((R=p==null?void 0:p.attributes)==null?void 0:R.color_temp_kelvin)||3500,A==="unknown"?I="状态待回读":I=P?"已开启":"已关闭"}else S==="climate"?(w="ac",ee=Number(((F=p==null?void 0:p.attributes)==null?void 0:F.temperature)||((U=p==null?void 0:p.attributes)==null?void 0:U.current_temperature)||25),te=A==="heat"?"制热":A==="dry"?"除湿":"制冷"):S==="cover"?(w="curtain",ie=typeof((B=p==null?void 0:p.attributes)==null?void 0:B.current_position)=="number"?p.attributes.current_position:P?100:0):S==="fan"?(w="fan",I=L?"设备离线":P?"运行中 · 2 档":"已关闭"):S==="lock"?(w="lock",I=P?"已上锁":"已解锁"):S==="media_player"?(w="tv",I=P?"播放中":"待机"):S==="vacuum"?(w="vacuum",I=A==="docked"?"充电座待命":A==="cleaning"?"正在清扫":A==="paused"?"清扫已暂停":A):S==="binary_sensor"||S==="sensor"?(w="sensor",L?I="传感器离线":T.includes("men_chuang")||j.includes("门窗")||(p==null?void 0:p.device_class)==="door"?I=A==="on"||A==="open"?"门窗 · 已打开":"门窗 · 已闭合":T.includes("ren_ti")||j.includes("人体")||(p==null?void 0:p.device_class)==="occupancy"||(p==null?void 0:p.device_class)==="motion"?I=A==="on"||A==="detected"?"感知 · 有人":"感知 · 无人":I=P?"已触发 · 活跃":"正常 · 待命"):(w="plug",I=P?"已开启":"已关闭");k.push({id:T,entityId:T,room:E,name:j,type:w,on:P,bri:V,ct:J,dimmable:K,supportsCt:Y,temp:ee,mode:te,pos:ie,sub:I,fav:w!=="sensor"&&A!=="unknown",offline:L,receipt:null})}let o=d;Array.isArray(i)&&i.length>0&&(o=i.slice(0,6).map(p=>{const T=String((p==null?void 0:p.id)??""),S=String((p==null?void 0:p.title)||(p==null?void 0:p.name)||`场景 ${T}`).trim(),E=String((p==null?void 0:p.room)||"").trim(),A=String((p==null?void 0:p.description)||(E?`${E} · 系统场景`:"SmartAgent 场景")).replace(/^系统固定灯光场景：/,"").replace(/。由 SmartAgent.*$/,""),L=S.includes("全关")||S.includes("关灯");return{id:`gw_scene_${T}`,name:S,desc:A,room:"all",hold:L,gatewaySceneId:T}}));let l=null;const v=((X=s==null?void 0:s.ai)==null?void 0:X.data)||(s==null?void 0:s.ai);if(v&&typeof v=="object"){const p=String(v.lastAction||"").trim(),T=Array.isArray(v.actionHistory)&&v.actionHistory.length>0?String(v.actionHistory[0]||"").trim():"",S=p||T;S&&(l=`最近动作：${S}（来自网关实时状态）`)}let m=c;const $=Array.isArray(a==null?void 0:a.items)?a.items:[];return $.length>0&&(m=$.map(p=>({id:String(p.question_id||p.id||""),q:String(p.prompt||p.question||p.title||""),eff:"已提交回答至 SmartAgent 网关。"}))),{rooms:h.length>0?h:[],devs:k.length>0?k:n,scenes:o,feedTxt:l,questions:m}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Re={CHILD:2},Pe=e=>(...t)=>({_$litDirective$:e,values:t});class Fe{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,i,s){this._$Ct=t,this._$AM=i,this._$Ci=s}_$AS(t,i){return this.update(t,i)}update(t,i){return this.render(...i)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Q extends Fe{constructor(t){if(super(t),this.it=_,t.type!==Re.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===_||t==null)return this._t=void 0,this.it=t;if(t===xe)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this._t;this.it=t;const i=[t];return i.raw=i,this._t={_$litType$:this.constructor.resultType,strings:i,values:[]}}}Q.directiveName="unsafeHTML",Q.resultType=1;const z=Pe(Q);function Z(e){return e==="sending"?u`<span class="badge sending"><i class="spin"></i>下发中</span>`:e==="ok"?u`<span class="badge ok">✓ 已确认</span>`:e==="unknown"?u`<span class="badge unknown">! 回执未知</span>`:_}function he(e,t,i){if(!e.linked)return _;const s=e.playlists.find(d=>d.id===e.playlistId)||e.playlists[0],a=s.tracks[e.trackIdx%s.tracks.length]||s.tracks[0],n=Math.min(100,Math.round(e.pos/Math.max(1,e.dur)*100));return u`
    <div
      class="dock ${e.playing?"playing":""}"
      id="dockBar"
      @click=${t}
    >
      <div class="cov" style="background:${s.color}">
        <span class="eq"><i></i><i></i><i></i></span>
      </div>
      <div class="meta">
        <div class="tt">${a.t}</div>
        <div class="ar">
          ${a.a} · 中控屏本机扬声器
          ${e.sleepMin?u` · 定时 ${e.sleepMin} 分钟后停`:_}
          ${e.ducked?u` · 语音压低音量中`:_}
        </div>
      </div>
      <div class="zones">
        ${Z(e.receipt)}
        <span class="zchip">本机音量 ${e.masterVol}%</span>
      </div>
      <div class="ctrls" @click=${d=>d.stopPropagation()}>
        <button class="cbtn" data-mact="prev" title="上一首" @click=${d=>i("prev",d)}>
          ${z(C.prev)}
        </button>
        <button class="cbtn pri" data-mact="toggle" title="播放/暂停" @click=${d=>i("toggle",d)}>
          ${z(e.playing?C.pause:C.play)}
        </button>
        <button class="cbtn" data-mact="next" title="下一首" @click=${d=>i("next",d)}>
          ${z(C.next)}
        </button>
      </div>
      <div class="p" style="width:${n}%"></div>
    </div>
  `}function Ee(e,t){const i=e.playlists.find(c=>c.id===e.playlistId)||e.playlists[0],s=i.tracks[e.trackIdx%i.tracks.length]||i.tracks[0],a=Math.min(100,Math.round(e.pos/Math.max(1,e.dur)*100)),n=e.engineMode||"local_synth",d=e.haMediaEntities||[];return e.linked?u`
    <div class="rhead">
      <div class="meta">
        <h2>中控屏背景音乐</h2>
        <span class="pill ${e.playing?"occ":""}">
          ${e.playing?"● 本机播放中":"已暂停"}
        </span>
        <span class="pill">${i.name}</span>
      </div>
      <button class="chip-btn" id="bLinkToggle" @click=${t.onToggleLink}>
        停用中控屏播放器
      </button>
    </div>

    <div class="mpage">
      <div class="mcol">
        <div class="mnow ${e.playing?"playing":""}">
          <div class="mhero">
            <div class="mcover" style="background:${i.color}">
              <div class="tag">${i.tag}</div>
              <div class="big">${i.name.split("·")[0]}</div>
            </div>
            <div class="mmeta">
              <span class="src">
                <span class="eq"><i></i><i></i><i></i></span>${e.source}
              </span>
              <div class="tt">${s.t}</div>
              <div class="ar">${s.a}</div>
              <div class="sub">
                ${n==="local_synth"?`输出设备：中控屏本机扬声器（内置合成器 · 音量 ${e.masterVol}%）`:n==="ha_media"?`联动实体：${e.selectedHaMediaId||"等待发现 HA media_player.*"}`:`直连流地址：${e.streamUrl||"https://ice2.somafm.com/lush-128-mp3"}`}
              </div>
            </div>
          </div>

          <div class="seek">
            <div class="seek-bar" id="seek" @pointerdown=${t.onSeekPointerDown}>
              <div class="seek-fill" style="width:${a}%"></div>
            </div>
            <div class="seek-time">
              <span>${N(e.pos)}</span>
              <span>${N(e.dur)}</span>
            </div>
          </div>

          <div class="mctrl">
            <button
              class="mcbtn ${e.shuffle?"on":""}"
              data-mc="shuffle"
              title="随机播放"
              @click=${()=>t.onControl("shuffle")}
            >
              ${z(C.shuffle)}
            </button>
            <button class="mcbtn" data-mc="prev" title="上一首" @click=${()=>t.onControl("prev")}>
              ${z(C.prev)}
            </button>
            <button class="mcbtn play" data-mc="toggle" title="播放/暂停" @click=${()=>t.onControl("toggle")}>
              ${z(e.playing?C.pause:C.play)}
            </button>
            <button class="mcbtn" data-mc="next" title="下一首" @click=${()=>t.onControl("next")}>
              ${z(C.next)}
            </button>
            <button
              class="mcbtn ${e.sleepMin?"on":""}"
              data-mc="timer"
              title="定时停止"
              style="width:auto;padding:0 12px;font-size:12px;font-weight:600;gap:5px;display:inline-flex"
              @click=${()=>t.onControl("timer")}
            >
              ${z(C.timer)}<span>${e.sleepMin?`${e.sleepMin}m`:"定时"}</span>
            </button>
          </div>

          <div class="mvol">
            <div class="bar" id="mvol" @pointerdown=${t.onMasterVolPointerDown}>
              <div class="fill" style="width:${e.masterVol}%"></div>
              <div class="lbl">
                <span>🔊 中控屏本机扬声器音量（左右拖动调节硬件音量）</span>
                <span id="mvolLbl">${e.masterVol}%</span>
              </div>
            </div>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;color:var(--text2)">
            <span>
              ${e.receipt==="sending"?"正在同步中控屏播放器…":e.receipt==="ok"?"✓ 中控屏播放器状态已确认":"背景音乐仅代表当前中控屏本机音乐"}
            </span>
            ${Z(e.receipt)}
          </div>
        </div>

        <div>
          <div class="sec-t">
            <span>中控屏氛围歌单</span>
            <span>点选立即在本机播放</span>
          </div>
          <div class="pl-grid">
            ${e.playlists.map(c=>u`
                <button
                  class="plc ${c.id===e.playlistId?"on":""}"
                  data-pl="${c.id}"
                  @click=${()=>t.onSelectPlaylist(c.id)}
                >
                  <div class="sw" style="background:${c.color}">♪</div>
                  <div style="min-width:0">
                    <div class="nm">${c.name}</div>
                    <div class="ds">${c.desc}</div>
                  </div>
                </button>
              `)}
          </div>
        </div>
      </div>

      <div class="mcol">
        <div class="mzones">
          <div class="sec-t" style="margin:0 0 2px">
            <span>自研直连音乐引擎（无如影云中转 · 100% 自有界面）</span>
            <span>支持小智语音点歌</span>
          </div>

          <!-- 模式 1：直连在线曲库搜索 + 小智语音点歌（无中转） -->
          <div
            class="zrow ${e.playlistId==="online_search"?"on":""}"
            style="display:flex;flex-direction:column;gap:8px"
          >
            <div class="ztop">
              <div>
                <div class="nm">1. 直连在线曲库搜索 + 小智语音点歌（无中转）</div>
                <div class="st">${e.searchStatus||"输入歌手/歌名或对小智说「帮我播放周杰伦的晴天」即可直连播放"}</div>
              </div>
              <span class="pill ${e.playlistId==="online_search"?"occ":""}">
                ${e.searching?"搜索中…":e.playlistId==="online_search"?"在线播放中":"直连曲库"}
              </span>
            </div>
            <div style="display:flex;gap:8px;align-items:center">
              <input
                class="settings-input"
                style="flex:1;margin:0;height:36px;border-radius:10px;padding:0 12px;background:var(--surface2);border:1px solid var(--line);color:var(--text);font-size:12px"
                .value=${e.searchQuery??"周杰伦"}
                placeholder="输入歌手或歌名（如：周杰伦 晴天 / 陈奕迅 / 邓紫棋）"
                @input=${c=>{var r;return(r=t.onUpdateSearchQuery)==null?void 0:r.call(t,c.target.value)}}
                @keydown=${c=>{var r;c.key==="Enter"&&((r=t.onSearchOnlineMusic)==null||r.call(t,e.searchQuery||"周杰伦"))}}
              />
              <button
                class="chip-btn pri"
                style="height:36px;padding:0 14px;border-radius:10px;font-size:12px"
                @click=${()=>{var c;return(c=t.onSearchOnlineMusic)==null?void 0:c.call(t,e.searchQuery||"周杰伦")}}
              >
                🔍 立即搜索播放
              </button>
            </div>
            <div style="display:flex;gap:6px;flex-wrap:wrap">
              ${["周杰伦","陈奕迅","邓紫棋","林俊杰","王菲","久石让","古典钢琴","Lo-Fi Chill"].map(c=>u`
                  <button
                    class="chip-btn ${e.searchQuery===c&&e.playlistId==="online_search"?"pri":""}"
                    style="height:26px;padding:0 10px;font-size:11px;border-radius:8px"
                    @click=${()=>{var r;return(r=t.onSearchOnlineMusic)==null?void 0:r.call(t,c)}}
                  >
                    ${c}
                  </button>
                `)}
            </div>
          </div>

          <!-- 模式 2：本机内置合成器 -->
          <div
            class="zrow ${n==="local_synth"?"on":""}"
            style="cursor:pointer"
            @click=${()=>{var c;return(c=t.onSelectEngineMode)==null?void 0:c.call(t,"local_synth")}}
          >
            <div class="ztop">
              <div>
                <div class="nm">2. 中控屏本机内置合成器（AudioTrack / WebAudio）</div>
                <div class="st">无需外部音箱或外网，直接通过中控屏本机喇叭实时播放环境爵士、原声、纯音乐与雨夜白噪音</div>
              </div>
              <span class="pill ${n==="local_synth"?"occ":""}">
                ${n==="local_synth"?"当前使用":"切换"}
              </span>
            </div>
          </div>

          <!-- 模式 3：Home Assistant 媒体播放器集成 -->
          <div
            class="zrow ${n==="ha_media"?"on":""}"
            style="cursor:pointer"
            @click=${()=>{var c;return(c=t.onSelectEngineMode)==null?void 0:c.call(t,"ha_media")}}
          >
            <div class="ztop">
              <div>
                <div class="nm">3. Home Assistant 媒体播放器集成（Music Assistant / DLNA）</div>
                <div class="st">
                  ${d.length>0?`已发现 ${d.length} 个 HA 媒体播放器实体，直接通过网关下发 media_play / volume_set`:"自动发现网关 media_player.* 实体（可在 HA 接入 Music Assistant / Apple Music / 网易云 / MPD）"}
                </div>
              </div>
              <span class="pill ${n==="ha_media"?"occ":""}">
                ${n==="ha_media"?"已联动":"切换"}
              </span>
            </div>
            ${d.length>0?u`
                  <div style="display:flex;gap:6px;flex-wrap:wrap;margin-top:8px">
                    ${d.map(c=>u`
                        <button
                          class="chip-btn ${e.selectedHaMediaId===c.id?"pri":""}"
                          style="height:28px;font-size:11px"
                          @click=${r=>{var h;r.stopPropagation(),(h=t.onSelectHaMedia)==null||h.call(t,c.id)}}
                        >
                          ${c.name} (${c.state})
                        </button>
                      `)}
                  </div>
                `:_}
          </div>

          <!-- 模式 4：开源音乐服务器 / 电台流直连 -->
          <div
            class="zrow ${n==="open_stream"&&e.playlistId!=="online_search"?"on":""}"
            style="cursor:pointer"
            @click=${()=>{var c;return(c=t.onSelectEngineMode)==null?void 0:c.call(t,"open_stream")}}
          >
            <div class="ztop">
              <div>
                <div class="nm">4. 开源音乐服务器 / 电台流直连（Navidrome / Icecast / MPD）</div>
                <div class="st">支持 HTTP/HTTPS 音频流（MP3 / AAC / OGG / FLAC）在中控屏本机直接解码播放</div>
              </div>
              <span class="pill ${n==="open_stream"?"occ":""}">
                ${n==="open_stream"?"直连中":"切换"}
              </span>
            </div>
          </div>

          <div class="sec-t" style="margin:6px 0 2px">
            <span>当前歌单曲目（点击直接切歌）</span>
            <span>${i.tracks.length} 首</span>
          </div>
          ${i.tracks.map((c,r)=>u`
              <div
                class="zrow ${r===e.trackIdx%i.tracks.length?"on":""}"
                style="padding:10px 12px;cursor:pointer"
                @click=${()=>{var h;return(h=t.onSelectTrackIdx)==null?void 0:h.call(t,r)}}
              >
                <div class="ztop">
                  <div>
                    <div class="nm">
                      ${r===e.trackIdx%i.tracks.length&&e.playing?"▶ ":`${r+1}. `}${c.t}
                    </div>
                    <div class="st">${c.a}</div>
                  </div>
                  <span style="font-size:11px;color:var(--text3)">${N(c.dur)}</span>
                </div>
              </div>
            `)}

          <div style="font-size:11px;color:var(--text3);line-height:1.5;margin-top:4px">
            说明：背景音乐属于中控屏本机功能；唤醒“小智”语音交互时本机音量会自动压低（Audio Ducking），对话结束后自动恢复。
          </div>
        </div>
      </div>
    </div>
  `:u`
      <div class="rhead">
        <div class="meta">
          <h2>中控屏背景音乐</h2>
          <span class="pill">已停用播放器</span>
        </div>
        <button class="chip-btn pri" id="bLinkToggle" @click=${t.onToggleLink}>
          启用中控屏播放器
        </button>
      </div>
      <div
        style="flex:1;border-radius:24px;background:var(--surface);border:1px solid var(--line);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;padding:32px;text-align:center;"
      >
        <div style="width:68px;height:68px;border-radius:22px;background:var(--surface2);display:grid;place-items:center;color:var(--text2)">
          ${z(C.speaker)}
        </div>
        <div style="font-size:20px;font-weight:700">中控屏背景音乐已停用</div>
        <div style="font-size:13px;color:var(--text2);max-width:440px;line-height:1.6">
          背景音乐仅代表当前中控屏本机扬声器或绑定的 Home Assistant 媒体播放器，不按每个房间伪造独立音箱。点击右上角即可重新启用。
        </div>
      </div>
    `}function Le(e,t,i,s){const a=!!e;if(!e)return u`<div class="sheet-mask" id="sheetMask"><div class="sheet" id="sheet"></div></div>`;const n=t.find(r=>r.id===e.room),d=e.receipt==="unknown"?u`<span>⚠️ 没收到设备回执，不会自动重发</span><button class="chip-btn pri" id="bRetry" @click=${s.onRetryRead}>重新读取状态</button>`:e.receipt==="sending"?u`<span>正在下发，等待设备回读…</span><span class="badge sending"><i class="spin"></i>下发中</span>`:u`<span>设备已回读，状态一致</span><span style="color:var(--ok)">● 在线</span>`;let c=u``;if(e.type==="light")if(!e.dimmable)c=u`
        <div
          style="padding:26px 20px;border-radius:18px;background:var(--surface2);border:1px solid var(--line);text-align:center"
        >
          <div
            style="width:74px;height:74px;border-radius:22px;background:${e.on?"rgba(255,181,71,.2)":"var(--surface)"};color:${e.on?"var(--amber)":"var(--text2)"};display:grid;place-items:center;margin:0 auto 12px"
          >
            ${z(C.bulb)}
          </div>
          <div style="font-size:21px;font-weight:700">${e.on?"灯具已开启":"灯具已关闭"}</div>
          <div style="font-size:12px;color:var(--text2);margin-top:6px">
            开关型照明回路（不支持调光与色温调节）· 点击直接切换开关状态
          </div>
        </div>
        <div class="seg" style="grid-template-columns:1fr 1fr;margin-top:8px">
          <button class="${e.on?"":"on"}" @click=${()=>s.onLightPower(!1)}>关灯</button>
          <button class="${e.on?"on":""}" @click=${()=>s.onLightPower(!0)}>开灯</button>
        </div>
      `;else{const r=[{k:2700,n:"暖烛光",c:"#FFB46B"},{k:3500,n:"暖白",c:"#FFD9A8"},{k:4500,n:"自然光",c:"#FFF3DF"},{k:5700,n:"日光",c:"#E6F0FF"}];c=u`
        <div class="vslider-wrap">
          <div class="vslider" id="vBri" @pointerdown=${s.onLightBriPointerDown}>
            <div class="vfill" id="vFill" style="height:${e.on?e.bri??70:0}%"></div>
            <div class="vlbl">
              <span id="vPct">${e.on?`${e.bri??70}%`:"已关"}</span>
              <span style="font-size:13px">上下拖动调光</span>
            </div>
          </div>
        </div>
        ${e.supportsCt!==!1?u`
              <div class="sec-t"><span>色温</span><span>${e.ct??4e3}K</span></div>
              <div class="ct-row">
                ${r.map(h=>u`
                    <button
                      class="ct ${e.ct===h.k?"sel":""}"
                      data-ct="${h.k}"
                      style="background:${h.c}"
                      @click=${()=>s.onLightCt(h.k)}
                    >
                      <span>${h.n}</span><span>${h.k}K</span>
                    </button>
                  `)}
              </div>
            `:_}
        <div class="seg" style="grid-template-columns:1fr 1fr;margin-top:8px">
          <button class="${e.on?"":"on"}" @click=${()=>s.onLightPower(!1)}>关灯</button>
          <button class="${e.on?"on":""}" @click=${()=>s.onLightPower(!0)}>开灯</button>
        </div>
      `}else if(e.type==="sensor")c=u`
      <div
        style="padding:26px 20px;border-radius:18px;background:var(--surface2);border:1px solid var(--line);text-align:center"
      >
        <div
          style="width:74px;height:74px;border-radius:22px;background:${e.on?"rgba(76,215,176,.16)":"var(--surface)"};color:${e.on?"var(--ok)":"var(--text2)"};display:grid;place-items:center;margin:0 auto 12px"
        >
          ${z(C.sensor)}
        </div>
        <div style="font-size:20px;font-weight:700">${H(e)}</div>
        <div style="font-size:12px;color:var(--text2);margin-top:6px">
          传感器仅用于环境感知与状态回传，不支持下发开关控制指令
        </div>
      </div>
    `;else if(e.type==="ac"){const r=["制冷","制热","除湿","睡眠"],h=e.temp??25,k=565*(1-(h-16)/14*.75);c=u`
      <div class="dial">
        <svg viewBox="0 0 220 220">
          <circle
            cx="110"
            cy="110"
            r="90"
            fill="none"
            stroke="rgba(255,255,255,.08)"
            stroke-width="14"
            stroke-dasharray="424 565"
            stroke-dashoffset="-70"
            stroke-linecap="round"
            transform="rotate(135 110 110)"
          />
          <circle
            cx="110"
            cy="110"
            r="90"
            fill="none"
            stroke="#38D5F5"
            stroke-width="14"
            stroke-dasharray="424 565"
            stroke-dashoffset="${k}"
            stroke-linecap="round"
            transform="rotate(135 110 110)"
          />
        </svg>
        <div>
          <div class="temp" id="acT">${h}°</div>
          <div class="sub">${e.on?`${e.mode??"制冷"} · 室内 ${(n==null?void 0:n.temp)??24.5}°`:"已关机"}</div>
        </div>
      </div>
      <div class="step-row">
        <button class="rbtn" id="acMinus" @click=${()=>s.onAcStep(-1)}>−</button>
        <button
          class="rbtn"
          id="acPow"
          style="width:110px;font-size:15px;background:${e.on?"var(--primary)":"var(--surface)"};color:${e.on?"#fff":"var(--text)"}"
          @click=${s.onAcPower}
        >
          ${e.on?"关机":"开机"}
        </button>
        <button class="rbtn" id="acPlus" @click=${()=>s.onAcStep(1)}>+</button>
      </div>
      <div class="sec-t"><span>模式</span></div>
      <div class="seg">
        ${r.map(o=>u`
            <button class="${e.mode===o&&e.on?"on":""}" data-md="${o}" @click=${()=>s.onAcMode(o)}>
              ${o}
            </button>
          `)}
      </div>
    `}else if(e.type==="curtain"){const r=e.pos??(e.on?100:0),h=(100-r)/2;c=u`
      <div class="curtain-vis">
        <div class="pane l" id="cPaneL" style="width:${h}%"></div>
        <div class="pane r" id="cPaneR" style="width:${h}%"></div>
      </div>
      <div class="hslider" id="cSlider" @pointerdown=${s.onCurtainPosPointerDown}>
        <div class="hfill" id="cFill" style="width:${r}%"></div>
        <div class="hlbl">
          <span>拖动调节开合度</span>
          <span id="cPct">${r}%</span>
        </div>
      </div>
      <div class="seg" style="grid-template-columns:repeat(3,1fr)">
        <button class="${r===0?"on":""}" data-cpos="0" @click=${()=>s.onCurtainQuickPos(0)}>全关</button>
        <button class="${r===50?"on":""}" data-cpos="50" @click=${()=>s.onCurtainQuickPos(50)}>半开 50%</button>
        <button class="${r===100?"on":""}" data-cpos="100" @click=${()=>s.onCurtainQuickPos(100)}>全开</button>
      </div>
    `}else e.type==="lock"?c=u`
      <div style="text-align:center;padding:28px 0">
        <div
          style="width:96px;height:96px;border-radius:28px;background:rgba(76,215,176,.15);color:var(--ok);display:grid;place-items:center;margin:0 auto 14px"
        >
          ${z(C.lock)}
        </div>
        <div style="font-size:22px;font-weight:700">${e.on?"门锁已上锁":"门锁已解锁"}</div>
        <div style="font-size:13px;color:var(--text2);margin-top:6px">
          ${e.sub||"高安全设备 · 操作需长按确认并记录日志"}
        </div>
      </div>
      <button
        class="scene hold"
        id="holdLock"
        style="width:100%;height:68px;align-items:center;justify-content:center"
        @pointerdown=${s.onLockHoldPointerDown}
      >
        <div class="bar" id="lockBar" style="width:${i}%"></div>
        <div class="nm">${e.on?"按住 1 秒解锁入户门":"按住 1 秒立即上锁"}</div>
        <div class="ds">松手即取消 · 防止误触</div>
      </button>
    `:c=u`
      <div style="padding:28px 0;text-align:center">
        <div style="font-size:22px;font-weight:700">${e.on?"运行中":"已关闭"}</div>
        <div style="font-size:13px;color:var(--text2);margin-top:6px">${H(e)}</div>
      </div>
      <button
        class="chip-btn pri"
        style="height:54px;font-size:15px"
        ?disabled=${e.offline}
        @click=${s.onGenericToggle}
      >
        ${e.on?"关闭设备":"开启设备"}
      </button>
    `;return u`
    <div
      class="sheet-mask ${a?"open":""}"
      id="sheetMask"
      @click=${r=>{var h;((h=r.target)==null?void 0:h.id)==="sheetMask"&&s.onClose()}}
    >
      <div class="sheet" id="sheet">
        <div class="sheet-hd">
          <div>
            <div class="tt">${e.name}</div>
            <div class="sub">${(n==null?void 0:n.name)??""} · ${H(e)}</div>
          </div>
          <button class="ibtn" id="sClose" @click=${s.onClose}>✕</button>
        </div>
        ${c}
        <div class="sheet-foot">${d}</div>
      </div>
    </div>
  `}function q(e,t,i,s,a){const n=i.find(g=>g.id===e.room);if(e.type==="sensor")return u`
      <div
        class="tile ${e.offline?"offline":""}"
        data-dev="${e.id}"
        style="cursor:default;background:${e.on?"rgba(76,215,176,.08)":"var(--surface)"};border-color:${e.on?"rgba(76,215,176,.3)":"var(--line)"}"
      >
        <div class="th">
          <div class="ic" style="background:${e.on?"rgba(76,215,176,.18)":"var(--surface2)"};color:${e.on?"var(--ok)":"var(--text2)"}">
            ${z(C.sensor)}
          </div>
          <span
            style="font-size:10px;font-weight:600;padding:3px 8px;border-radius:999px;background:var(--surface2);color:var(--text3);border:1px solid var(--line)"
          >
            仅状态反馈
          </span>
        </div>
        <div>
          ${t?u`<div class="rm">${(n==null?void 0:n.name)??""}</div>`:_}
          <div class="nm">${e.name}</div>
          <div class="st" style="color:${e.on?"var(--ok)":"var(--text2)"}">${H(e)}</div>
        </div>
      </div>
    `;const d=e.type==="light",r=d&&!!e.dimmable&&e.on?e.bri??70:0,h=e.type==="ac"&&e.on;return u`
    <div
      class="tile ${e.on?"on":""} ${h?"cool":""} ${e.offline?"offline":""}"
      data-dev="${e.id}"
      @pointerdown=${g=>s(e,g)}
    >
      <div class="fill" style="width:${r}%"></div>
      <div class="th">
        <div class="ic">${z(C[e.type]||C.bulb)}</div>
        <div style="display:flex;align-items:center;gap:4px">
          ${Z(e.receipt??null)}
          ${d&&!e.dimmable&&!e.receipt?u`<span
                style="font-size:10px;font-weight:700;padding:3px 8px;border-radius:999px;background:${e.on?"rgba(255,181,71,.2)":"var(--surface2)"};color:${e.on?"var(--amber)":"var(--text3)"}"
              >
                开关 · ${e.on?"开":"关"}
              </span>`:_}
          <button
            class="more"
            data-more="${e.id}"
            title="更多调节"
            @pointerdown=${g=>g.stopPropagation()}
            @click=${g=>{g.stopPropagation(),a(e.id,g)}}
          >
            ›
          </button>
        </div>
      </div>
      <div>
        ${t?u`<div class="rm">${(n==null?void 0:n.name)??""}</div>`:_}
        <div class="nm">${e.name}</div>
        <div class="st">${H(e)}</div>
      </div>
    </div>
  `}function Be(e,t,i,s,a,n){const d=t.filter(r=>r.type==="light"&&r.on).length,c=t.filter(r=>r.fav);return u`
    <div class="rhead">
      <div class="meta">
        <h2>全屋</h2>
        <span class="pill occ">● 2 人在家</span>
        <span class="pill">${d} 盏灯亮着</span>
      </div>
      <div class="meta">
        <span class="pill">轻点开关 · 左右拖动调亮度 · 点 › 打开细调</span>
      </div>
    </div>

    <div class="scenes">
      ${i.map(r=>u`
          <button
            class="scene ${r.hold?"hold":""}"
            data-scene="${r.id}"
            @click=${()=>{r.hold||n.onSceneClick(r)}}
            @pointerdown=${h=>{r.hold&&n.onSceneHoldPointerDown(r,h)}}
          >
            <div class="bar" style="width:${a[r.id]||0}%"></div>
            <div class="row">
              <span class="nm">${r.name}</span>
              <span style="color:var(--primary)">${z(C.spark)}</span>
            </div>
            <div class="ds">${r.desc}</div>
          </button>
        `)}
    </div>

    <div class="scroll">
      <div class="alert">
        <span><b>提醒</b> · 阳台窗户还开着，室外湿度偏高，建议关闭后再开除湿</span>
        <button class="chip-btn" id="jumpBalcony" @click=${()=>n.onJumpRoom("balcony")}>
          去阳台看看
        </button>
      </div>

      <div>
        <div class="sec-t">
          <span>房间（点卡片进入房间，点右下胶囊一键开关本房间灯）</span>
          <span>${e.length} 个空间</span>
        </div>
        <div class="rooms">
          ${e.map(r=>{const h=t.filter(k=>k.room===r.id&&k.type==="light"),g=h.filter(k=>k.on).length,y=t.find(k=>k.room===r.id&&k.type==="ac");return u`
              <div
                class="rcard ${g>0?"has-on":""}"
                data-go="${r.id}"
                @click=${()=>n.onJumpRoom(r.id)}
              >
                <div class="top-r">
                  <div>
                    <div class="rn">${r.name}</div>
                    <div class="occ ${r.occ?"on":""}">${r.occ?"● 有人":"无人"}</div>
                  </div>
                  <div class="env-mini">${r.temp}° · ${r.hum}%</div>
                </div>
                <div class="quick">
                  <button
                    class="qpill ${g>0?"on":""}"
                    data-roomlights="${r.id}"
                    @click=${k=>{k.stopPropagation(),n.onToggleRoomLights(r.id,k)}}
                  >
                    ${z(C.bulb)}<span>${g>0?`${g}/${h.length} 亮`:"灯已关"}</span>
                  </button>
                  <div style="display:flex;gap:6px;align-items:center">
                    ${y?u`<span class="qpill">${y.on?`空调 ${y.temp}°`:"空调关"}</span>`:u`<span></span>`}
                  </div>
                </div>
              </div>
            `})}
        </div>
      </div>

      <div>
        <div class="sec-t">
          <span>常用设备</span>
          <span>在全屋直接控制</span>
        </div>
        <div class="grid">
          ${c.map(r=>q(r,!0,e,n.onTilePointerDown,n.onOpenSheet))}
        </div>
      </div>
    </div>

    ${he(s,n.onOpenMusic,n.onMusicAction)}
  `}function je(e,t,i,s,a,n){const d=i.filter(o=>o.room===e.id),c=d.filter(o=>o.type==="light"),r=d.filter(o=>o.type==="ac"||o.type==="curtain"||o.type==="fan"),h=d.filter(o=>["tv","plug","lock","vacuum"].includes(o.type)),g=d.filter(o=>o.type==="sensor"),y=c.some(o=>!!o.dimmable),k=[{id:"r_bright",name:`${e.name}明亮`,desc:"本房间灯光 85%",room:e.id},{id:"r_cozy",name:`${e.name}柔和`,desc:"暖光 35% · 适合放松",room:e.id},{id:"r_off",name:"本房间全关",desc:"按住 1 秒关闭本房间设备",room:e.id,hold:!0}];return u`
    <div class="rhead">
      <div class="meta">
        <h2>${e.name}</h2>
        <span class="pill ${e.occ?"occ":""}">${e.occ?"● 有人":"无人"}</span>
        <span class="pill">🌡 ${e.temp}°C</span>
        <span class="pill">💧 ${e.hum}%</span>
      </div>
      <div class="meta">
        <button class="chip-btn" id="backAll" @click=${()=>n.onJumpRoom("all")}>
          ← 返回全屋
        </button>
      </div>
    </div>

    <div class="scenes">
      ${k.map(o=>u`
          <button
            class="scene ${o.hold?"hold":""}"
            data-rscene="${o.id}"
            @click=${()=>{o.hold||n.onSceneClick(o)}}
            @pointerdown=${l=>{o.hold&&n.onSceneHoldPointerDown(o,l)}}
          >
            <div class="bar" style="width:${a[o.id]||0}%"></div>
            <div class="row">
              <span class="nm">${o.name}</span>
              <span style="color:var(--primary)">${z(C.spark)}</span>
            </div>
            <div class="ds">${o.desc}</div>
          </button>
        `)}
    </div>

    <div class="scroll">
      ${c.length?u`
            <div>
              <div class="sec-t">
                <span>${y?"灯光（可调光卡片左右拖动调亮度 · 开关灯轻点切换）":"照明开关（轻点卡片直接开关灯具）"}</span>
                <span>${c.filter(o=>o.on).length}/${c.length} 开启</span>
              </div>
              <div class="grid">
                ${c.map(o=>q(o,!1,t,n.onTilePointerDown,n.onOpenSheet))}
              </div>
            </div>
          `:_}

      ${r.length?u`
            <div>
              <div class="sec-t"><span>温度 · 窗帘 · 空气</span></div>
              <div class="grid">
                ${r.map(o=>q(o,!1,t,n.onTilePointerDown,n.onOpenSheet))}
              </div>
            </div>
          `:_}

      ${h.length?u`
            <div>
              <div class="sec-t"><span>影音 · 插座与安防</span></div>
              <div class="grid">
                ${h.map(o=>q(o,!1,t,n.onTilePointerDown,n.onOpenSheet))}
              </div>
            </div>
          `:_}

      ${g.length?u`
            <div>
              <div class="sec-t">
                <span>环境与状态传感器（仅实时状态反馈 · 不可操作）</span>
                <span>${g.length} 个探头</span>
              </div>
              <div class="grid">
                ${g.map(o=>q(o,!1,t,n.onTilePointerDown,n.onOpenSheet))}
              </div>
            </div>
          `:_}
    </div>

    ${he(s,n.onOpenMusic,n.onMusicAction)}
  `}function Ve(e,t,i,s,a,n,d,c,r,h,g,y,k,o,l,v,m,$){return u`
    <aside class="side">
      <div class="clock-card">
        <div class="time-row">
          <div class="time" id="clk">${e}</div>
        </div>
        <div class="date" id="dt">${t}</div>
        <div class="wx">
          <span><b>${i}</b> · ${s}</span>
          <span>室外 PM2.5 28</span>
        </div>
      </div>

      <div class="env">
        <div class="env-c"><div class="k">室内均温</div><div class="v">${a}</div></div>
        <div class="env-c"><div class="k">室内湿度</div><div class="v">${n}</div></div>
        <div class="env-c"><div class="k">空气质量</div><div class="v ok">${d}</div></div>
        <div class="env-c"><div class="k">在家成员</div><div class="v" id="eHome">2 人</div></div>
        <div class="env-c"><div class="k">亮着的灯</div><div class="v" id="eLights">${c} 盏</div></div>
        <div class="env-c"><div class="k">有人房间</div><div class="v" id="eOcc">${r} 间</div></div>
      </div>

      <div class="feed" id="feedCard">
        <div class="tag">
          <span>✦ SmartAgent · 3 分钟前</span>
          <span style="color:var(--text2);font-weight:500">可随时撤销</span>
        </div>
        <div class="msg" id="feedTxt">${h}</div>
        <div class="acts">
          ${g?_:u`<button class="chip-btn" id="bUndo" @click=${l}>撤销这次操作</button>`}
          ${y?_:u`<button class="chip-btn" id="bMuteRule" @click=${v}>以后别这样</button>`}
        </div>
      </div>

      ${k?u`
            <div class="q" id="qCard">
              <div class="hd">
                <span>💬 待我回答</span>
                <span id="qIdx">${o}</span>
              </div>
              <div class="qt" id="qTxt">${k.q}</div>
              <div class="acts">
                <button class="chip-btn pri" data-q="yes" @click=${()=>m("yes")}>同意</button>
                <button class="chip-btn" data-q="later" @click=${()=>m("later")}>暂时不要</button>
                <button class="chip-btn" data-q="never" @click=${()=>m("never")}>不用了</button>
              </div>
            </div>
          `:_}

      <button class="voice" id="bVoice" @click=${$}>
        <div class="orb"></div>
        <div>
          <div class="t1">说“小智”，或点我说话</div>
          <div class="t2">“把客厅灯调暗一点” · “我要睡觉了”</div>
        </div>
      </button>
    </aside>
  `}function Oe(e,t,i,s,a,n,d){const c=i.zones.filter(g=>g.joined&&g.online),r=i.linked&&i.playing&&c.length>0,h=i.linked?r?"音乐 · 播放中":"音乐":"音乐 · 未接入";return u`
    <header class="top">
      <div class="brand">
        <div class="logo">✦</div>
        <div>
          <div class="t1">我的家</div>
          <div class="t2" id="greet">${s}</div>
        </div>
      </div>

      <nav class="tabs" id="tabs" role="tablist" aria-label="房间切换">
        <button
          class="tab ${e==="all"?"active":""}"
          data-room="all"
          role="tab"
          aria-selected="${e==="all"?"true":"false"}"
          @click=${()=>d.onSelectRoom("all")}
        >
          全屋
        </button>
        ${t.map(g=>u`
            <button
              class="tab ${e===g.id?"active":""}"
              data-room="${g.id}"
              role="tab"
              aria-selected="${e===g.id?"true":"false"}"
              @click=${()=>d.onSelectRoom(g.id)}
            >
              ${g.occ?u`<span class="dot"></span>`:_}${g.name}
            </button>
          `)}
      </nav>

      <div class="top-right">
        <button
          class="mus-pill ${r?"on playing":""} ${e==="music"?"active":""}"
          id="bMusic"
          title="背景音乐"
          @click=${d.onToggleMusicView}
        >
          <span class="eq"><i></i><i></i><i></i></span>
          <span id="musPillTxt">${h}</span>
        </button>
        <div
          class="net ${n==="warn"?"warn":n==="bad"?"bad":""}"
          id="netBadge"
          title="网络与网关设置"
          @click=${d.onOpenSettings}
        >
          <i></i><span id="netTxt">${a}</span>
        </div>
        <button class="ibtn" id="bTheme" title="切换日/夜外观" @click=${d.onToggleTheme}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </svg>
        </button>
        <button class="ibtn" id="bSaver" title="进入息屏时钟" @click=${d.onOpenSaver}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
          </svg>
        </button>
        ${d.onSwitchToMobile?u`
              <button
                class="ibtn"
                id="bMobileView"
                title="切换至手机端 V5 竖屏布局"
                @click=${d.onSwitchToMobile}
              >
                📱
              </button>
            `:_}
        <button class="ibtn" id="bSettings" title="极简设置/诊断" @click=${d.onOpenSettings}>
          ${z(C.settings)}
        </button>
      </div>
    </header>
  `}function qe(e,t,i,s,a,n){return u`
    <div class="vo ${e?"open":""}" id="vo">
      ${t?u`<div
            id="vDuckHint"
            style="display:inline-flex;align-items:center;gap:6px;height:30px;padding:0 12px;border-radius:999px;background:rgba(56,213,245,.15);border:1px solid rgba(56,213,245,.35);font-size:12px;color:var(--cyan)"
          >
            🔉 已自动把背景音乐调低，说完恢复
          </div>`:_}
      <div class="vorb"></div>
      <div class="vtranscript" id="vSaid">${i}</div>
      <div class="vsteps" id="vSteps">
        <span class="vstep ${s===0?"on":""}">1 听见</span>
        <span class="vstep ${s===1?"on":""}">2 理解</span>
        <span class="vstep ${s===2?"on":""}">3 执行</span>
        <span class="vstep ${s===3?"on":""}">4 设备已回读</span>
      </div>
      <div class="vreply" id="vAns">${a}</div>
      <button class="chip-btn" id="vClose" style="height:40px;padding:0 20px" @click=${n}>
        关闭 (Esc)
      </button>
    </div>
  `}function He(e,t,i,s,a,n,d){const c=s.zones.filter(y=>y.joined&&y.online),r=s.linked&&s.playing&&c.length>0,h=s.playlists.find(y=>y.id===s.playlistId)||s.playlists[0],g=h.tracks[s.trackIdx%h.tracks.length]||h.tracks[0];return u`
    <div class="saver ${e?"open":""}" id="saver" @click=${d}>
      <div style="display:flex;justify-content:space-between;align-items:center">
        <span style="font-size:16px;color:#6c7893">我的家 · 轻触屏幕任意位置唤醒</span>
        ${r?u`<span id="sMus" style="display:inline-flex;align-items:center;gap:8px;font-size:15px;color:#8fa0c2">
              ♪ 正在播放 · <b id="sMusTrack" style="color:#dde3f0">${g.t} · ${g.a}</b>
            </span>`:_}
      </div>
      <div>
        <div class="big-t" id="sClk">${t}</div>
        <div class="big-d" id="sDt">${i}</div>
      </div>
      <div class="bot">
        <span>室内 <b>${a}</b> · 湿度 <b>48%</b></span>
        <span>在家 <b id="sHome">2 人</b></span>
        <span>开启的灯 <b id="sLights">${n} 盏</b></span>
        <span>全屋安防 <b>正常</b></span>
      </div>
    </div>
  `}function Ue(e,t,i,s){return e?u`
    <div
      class="sheet-mask open"
      id="settingsMask"
      @click=${a=>{var n;((n=a.target)==null?void 0:n.id)==="settingsMask"&&s()}}
    >
      <div
        class="sheet"
        style="width:760px;max-width:92vw;background:var(--bg2);border-left:1px solid var(--line2);padding:24px 26px;gap:16px"
      >
        <div
          class="sheet-hd"
          style="padding-bottom:14px;border-bottom:1px solid var(--line)"
        >
          <div style="display:flex;align-items:center;gap:12px">
            <div
              style="width:42px;height:42px;border-radius:14px;background:linear-gradient(135deg,var(--primary),var(--cyan));display:grid;place-items:center;color:#08101d;font-weight:900;box-shadow:0 8px 20px rgba(91,108,240,.35)"
            >
              ${z(C.settings)}
            </div>
            <div>
              <div class="tt" style="font-size:19px;font-weight:800">系统设置与中枢诊断 · 极简设置/诊断</div>
              <div class="sub" style="margin-top:2px">显示与息屏 · 语音免唤醒 · 网关受限配对 · 能耗与视觉感知</div>
            </div>
          </div>
          <button
            class="chip-btn"
            style="height:38px;padding:0 16px;border-radius:12px;font-weight:700"
            @click=${s}
          >
            ✕ 完成并返回
          </button>
        </div>
        <div class="scroll" style="gap:14px;padding-right:4px">
          ${t}
          ${i}
        </div>
      </div>
    </div>
  `:_}function Ne(e){return z(C[e]||C.bulb)}function ue(e){return z(e==="away"||e==="alloff"?C.power||C.spark:e==="movie"?C.tv:(e==="sleep"||e==="night")&&C.moon||C.spark)}function ve(e){return e.hold?{tag:"长按 1s",color:"#FF7B7B"}:e.id==="sleep"||e.id==="night"?{tag:"睡眠安享",color:"#7C8CFF"}:e.id==="movie"?{tag:"影音联动",color:"#38D5F5"}:{tag:"一键执行",color:"#FFB547"}}function ce(e){return N(e)}function ge(e){return e.playlists.find(t=>t.id===e.playlistId)||e.playlists[0]}function me(e){const t=ge(e);return t.tracks[e.trackIdx%t.tracks.length]||t.tracks[0]}function de(){return{activityChains:[{id:"act-1",title:"客厅渐亮夜灯与柔光灯带",time:"21:18:04",room:"客厅",trigger:"人体存在传感器 binary_sensor.living_presence",condition:"室内照度 12lx < 40lx · 非休息模式",decision:"夜间柔和跟人亮灯策略（rule_night_soft_follow）",action:"light.turn_on(l_strip, brightness=35%, kelvin=2700)",receipt:"已回读确认 ✓ (38ms)",status:"ok",statusText:"已回读确认 ✓"},{id:"act-2",title:"书房台灯状态同步异常",time:"20:42:19",room:"书房",trigger:"用户手势点击 tile(s_desk)",condition:"Zigbee 路由节点响应超时",decision:"单次下发控制指令（遵守不自动重发契约）",action:"light.turn_on(s_desk)",receipt:"! 回执未知 · 未收到物理状态回流",status:"unknown",statusText:"未确认 · 不自动重发"},{id:"act-3",title:"主卧睡前温度微调",time:"20:15:00",room:"主卧",trigger:"AI 习惯引擎定时预热",condition:"主卧温度 26.1°C · 湿度 52%",decision:"睡前舒适温控策略",action:"climate.set_temperature(m_ac, 24°C, mode=sleep)",receipt:"已回读确认 ✓ (51ms)",status:"ok",statusText:"已回读确认 ✓"},{id:"act-4",title:"远程语音请求开启玄关门锁",time:"18:09:42",room:"玄关",trigger:"远场语音意图 lock.unlock(e_lock)",condition:"高风险设备 r3 安全防线触发",decision:"管家策略拦截：门锁严禁无授权远场自动解锁",action:"已拦截 · 未下发物理指令",receipt:"安全防线已保护 · 仅只读展示",status:"blocked",statusText:"安全拦截 · r3 只读"}],inboxItems:[{id:"inb-1",kind:"habit",tag:"AI 习惯候选 · 置信度 91%",time:"10 分钟前",title:"将「23:30 主卧自动切入休息模式」设为固定规则？",desc:"过去 7 天你有 6 天在 23:25–23:40 关闭主卧顶灯并保留床头 15% 微光。"},{id:"inb-2",kind:"warn",tag:"设备异常提醒 · Zigbee",time:"46 分钟前",title:"书房台灯 (s_desk) 信号弱或掉线",desc:"最近一次控制未收到物理回执，建议检查书房插座供电或网关信号。"}],sceneDrafts:[{id:"draft-read",name:"周末午后阅读",prompt:"周末下午把客厅纱帘关到 50%，打开沙发灯带 45% 暖光，播放轻音乐",actionsSummary:"客厅纱帘 50% · 沙发灯带 45% (3200K) · 背景音乐《午后原声》",approved:!1}],chatMessages:[{role:"ai",text:"晚上好！全屋目前有 4 盏灯亮起，客厅与主卧有人。你可以直接对我说「把客厅灯调暗一点」、「开启主卧休息模式」，或让我帮你生成新场景。",time:"21:15"}]}}function Ge(e,t){if(e.offline)return"离线 · 请检查供电";if(e.receipt==="sending")return"指令已下发 · 待回读…";if(e.receipt==="unknown")return"! 回执未知 · 请核对";if(e.type==="light")return e.on?e.dimmable?`已开启 · ${e.bri??80}%`:"已开启":"已关闭";if(e.type==="ac")return e.on?`${e.mode||"制冷"} ${e.temp??25}°`:"已关闭";if(e.type==="curtain")return(e.pos??0)>5?`开启 ${e.pos}%`:"已关闭";if(e.type==="lock")return"已上锁 · 安全只读";if(e.type==="speaker"){const i=t.zones.find(s=>s.room===e.room);return!i||!i.online?"离线":t.linked&&t.playing&&i.joined?`播放中 · 音量 ${i.vol}%`:`待机 · 音量 ${i.vol}%`}return e.on?e.sub||"运行中":"已关闭"}function pe(e,t,i,s){const a=e.type==="speaker"?t.zones.find(r=>r.room===e.room):null,n=e.type==="speaker"?!!(t.linked&&t.playing&&(a!=null&&a.joined)&&(a!=null&&a.online)):!!(e.on&&!e.offline),d=e.type==="light"&&e.dimmable&&e.on?e.bri||0:e.type==="speaker"&&n&&a?a.vol:0;let c=_;return e.offline?c=u`<span class="m-badge off">离线</span>`:e.receipt==="sending"?c=u`<span class="m-badge wait">下发中…</span>`:e.receipt==="unknown"?c=u`<span class="m-badge warn">! 未确认</span>`:e.receipt==="ok"?c=u`<span class="m-badge ok">✓ 已确认</span>`:e.type==="lock"&&(c=u`<span class="m-badge lock">安全只读</span>`),u`
    <div
      class="tile m-tile ${n?"on":""} ${e.offline?"off":""}"
      data-id="${e.id}"
      @pointerdown=${r=>s.onTilePointerDown(e,r)}
    >
      <div class="fill" style="width:${d}%"></div>
      <div class="top">
        <div class="ico">${Ne(e.type)}</div>
        <div style="display:flex;align-items:center;gap:4px">
          ${c}
          <button
            class="more"
            title="细腻调节"
            @pointerdown=${r=>r.stopPropagation()}
            @click=${r=>{r.stopPropagation(),s.onOpenSheet(e.id)}}
          >
            ›
          </button>
        </div>
      </div>
      <div>
        <div class="nm">${i?`${i} · ${e.name}`:e.name}</div>
        <div class="st">${Ge(e,t)}</div>
      </div>
    </div>
  `}function We(e,t){const i=e.devs.filter(n=>n.type==="light"&&n.on&&!n.offline).length,s=e.rooms.filter(n=>n.occ).length,a=e.rooms.find(n=>n.id===e.activeRoomId)||null;return u`
    <div class="m-tab-body">
      <!-- Room Pills Horizontal Bar -->
      <div class="m-room-pills" role="tablist" aria-label="房间切换">
        <button
          class="m-rpill ${e.activeRoomId==="all"?"active":""}"
          @click=${()=>t.onSelectRoom("all")}
        >
          全屋
        </button>
        ${e.rooms.map(n=>{const d=!!e.roomRestMap[n.id];return u`
            <button
              class="m-rpill ${e.activeRoomId===n.id?"active":""}"
              @click=${()=>t.onSelectRoom(n.id)}
            >
              ${n.occ?u`<span class="m-occ-dot"></span>`:_}
              <span>${n.name}</span>
              ${d?u`<span title="休息模式中">🌙</span>`:_}
            </button>
          `})}
      </div>

      <!-- 6-Cell Micro Environment Bar -->
      <div class="m-env-strip">
        <div class="m-env-cell">
          <span class="k">室外</span>
          <span class="v">晴 19°</span>
        </div>
        <div class="m-env-cell">
          <span class="k">室内均温</span>
          <span class="v">24.3°</span>
        </div>
        <div class="m-env-cell">
          <span class="k">湿度</span>
          <span class="v">49%</span>
        </div>
        <div class="m-env-cell">
          <span class="k">PM2.5</span>
          <span class="v ok">优 18</span>
        </div>
        <div class="m-env-cell">
          <span class="k">亮灯</span>
          <span class="v amber">${i} 盏</span>
        </div>
        <div class="m-env-cell">
          <span class="k">有人房间</span>
          <span class="v ok">${s} 间</span>
        </div>
      </div>

      <!-- AI Proactive Feed Card (Aligned with V5 Left Sidebar Feed) -->
      <div class="feed m-feed">
        <div class="tag">
          <span>✦ 小智管家 · 刚刚为你处理</span>
          <span>可随时撤销</span>
        </div>
        <div class="msg">${e.feedTxt}</div>
        <div class="acts">
          <button
            class="chip-btn"
            ?disabled=${e.feedUndone}
            style=${e.feedUndone?"opacity:0.5":""}
            @click=${t.onUndoFeed}
          >
            ${e.feedUndone?"✓ 已撤销":"撤销这次操作"}
          </button>
          <button
            class="chip-btn"
            ?disabled=${e.feedMuted}
            style=${e.feedMuted?"opacity:0.5":""}
            @click=${t.onMuteFeed}
          >
            ${e.feedMuted?"✓ 已记住偏好":"以后别这样"}
          </button>
        </div>
      </div>

      <!-- Owner Question Card (Aligned with V5 Owner Question) -->
      ${e.curQ?u`
            <div class="q m-q">
              <div class="hd">
                <span>💡 管家贴心询问</span>
                <span>${e.qCounter}</span>
              </div>
              <div class="qt">${e.curQ.q}</div>
              <div class="acts">
                <button class="chip-btn pri" @click=${()=>t.onAnswerQuestion("yes")}>同意</button>
                <button class="chip-btn" @click=${()=>t.onAnswerQuestion("later")}>暂时不要</button>
                <button class="chip-btn" @click=${()=>t.onAnswerQuestion("no")}>不用了</button>
              </div>
            </div>
          `:_}

      ${e.activeRoomId==="all"?u`
            <!-- Quick Scenes Horizontal Scroll -->
            <div class="m-sec-hd">
              <span>常用场景</span>
              <span class="sub">点按即执行 · 离家/全关需按住 1 秒防误触</span>
            </div>
            <div class="scenes m-scenes">
              ${e.scenes.map(n=>{const d=e.holdProgressMap[n.id]||0,c=ve(n);return u`
                  <div
                    class="scene m-scene"
                    data-scene="${n.id}"
                    @pointerdown=${r=>{n.hold&&t.onSceneHoldPointerDown(n,r)}}
                    @click=${()=>{n.hold||t.onSceneClick(n)}}
                  >
                    <div class="bar" style="width:${d}%"></div>
                    <div class="s-top">
                      <div class="s-ico" style="color:${c.color}">${ue(n.id)}</div>
                      <span class="s-tag">${c.tag}</span>
                    </div>
                    <div>
                      <div class="s-name">${n.name}</div>
                      <div class="s-desc">${n.desc}</div>
                    </div>
                  </div>
                `})}
            </div>

            <!-- 2-Column Room Overview Cards with 1-Tap Light & Rest Mode Toggles -->
            <div class="m-sec-hd">
              <span>房间速览与免打扰</span>
              <span class="sub">点按进入房间 · 可一键开关房间灯或切休息模式</span>
            </div>
            <div class="m-room-grid">
              ${e.rooms.map(n=>{const d=e.devs.filter(h=>h.room===n.id),c=d.filter(h=>h.type==="light"&&h.on&&!h.offline).length,r=!!e.roomRestMap[n.id];return u`
                  <div
                    class="m-rcard ${c>0?"lit":""} ${r?"rest":""}"
                    @click=${()=>t.onSelectRoom(n.id)}
                  >
                    <div class="m-rc-top">
                      <div>
                        <div class="m-rc-name">
                          <span>${n.name}</span>
                          ${n.occ?u`<span class="m-occ-dot" title="有人"></span>`:_}
                        </div>
                        <div class="m-rc-env">${n.temp}°C · ${n.hum}%</div>
                      </div>
                      <span class="m-rc-cnt">${d.length} 设备</span>
                    </div>
                    <div class="m-rc-actions" @click=${h=>h.stopPropagation()}>
                      <button
                        class="m-mini-pill ${c>0?"lit":""}"
                        @click=${()=>t.onToggleRoomLights(n.id)}
                      >
                        💡 ${c>0?`${c} 盏亮`:"全关"}
                      </button>
                      <button
                        class="m-mini-pill ${r?"rest":""}"
                        title="切换本房休息免打扰模式"
                        @click=${()=>t.onToggleRoomRest(n.id)}
                      >
                        ${r?"🌙 休息中":"☀ 正常"}
                      </button>
                    </div>
                  </div>
                `})}
            </div>

            <!-- High-Frequency Devices 2-Column Grid -->
            <div class="m-sec-hd">
              <span>高频受控设备</span>
              <span class="sub">单击开关 · 左右滑调光 · 点 › 弹出细腻控制</span>
            </div>
            <div class="m-tile-grid">
              ${e.devs.filter(n=>n.fav).map(n=>{var c;const d=((c=e.rooms.find(r=>r.id===n.room))==null?void 0:c.name)||"";return pe(n,e.music,d,t)})}
            </div>
          `:u`
            <!-- Single Room Focus View -->
            ${a?u`
                  <div class="m-room-hero">
                    <div class="m-rh-top">
                      <div>
                        <div class="m-rh-title">
                          <span>${a.name}</span>
                          <span class="pill ${a.occ?"occ":""}" style="height:24px;font-size:11px">
                            ${a.occ?"● 有人在房间":"○ 当前无人"}
                          </span>
                        </div>
                        <div class="m-rh-sub">
                          温度 ${a.temp}°C · 湿度 ${a.hum}% ·
                          ${e.roomRestMap[a.id]?"🌙 休息模式已开启（暂停自动亮灯与语音打扰）":"☀ 自动跟随与语音播报正常"}
                        </div>
                      </div>
                      <button
                        class="chip-btn ${e.roomRestMap[a.id]?"pri":""}"
                        @click=${()=>t.onToggleRoomRest(a.id)}
                      >
                        ${e.roomRestMap[a.id]?"🌙 退出休息":"🌙 设为休息"}
                      </button>
                    </div>
                    <div class="m-rh-Presets">
                      <button
                        class="chip-btn"
                        @click=${()=>t.onSceneClick({id:"r_bright",name:"本房明亮",desc:"85% 4000K",room:a.id})}
                      >
                        ☀ 明亮会客
                      </button>
                      <button
                        class="chip-btn"
                        @click=${()=>t.onSceneClick({id:"r_cozy",name:"本房柔和",desc:"35% 2700K",room:a.id})}
                      >
                        🕯 柔和氛围
                      </button>
                      <button
                        class="chip-btn"
                        @click=${()=>t.onSceneClick({id:"r_off",name:"关闭本房",desc:"除门锁外全关",room:a.id})}
                      >
                        ⏻ 本房全关
                      </button>
                    </div>
                  </div>
                `:_}

            <div class="m-tile-grid">
              ${e.devs.filter(n=>n.room===e.activeRoomId).map(n=>pe(n,e.music,null,t))}
            </div>
          `}
    </div>
  `}function Qe(e,t){const i=e.inboxItems.filter(a=>!a.resolved).length+(e.curQ?1:0),s=e.activityChains.filter(a=>e.activityFilter==="ok"?a.status==="ok":e.activityFilter==="warn"?a.status!=="ok":!0);return u`
    <div class="m-tab-body">
      <!-- Sub-navigation aligned with V5 Admin UI (#activity / #inbox / Steward Chat) -->
      <div class="m-sub-seg">
        <button
          class="${e.stewardSub==="activity"?"on":""}"
          @click=${()=>t.onSelectStewardSub("activity")}
        >
          ⛓ 执行链路 (${e.activityChains.length})
        </button>
        <button
          class="${e.stewardSub==="inbox"?"on":""}"
          @click=${()=>t.onSelectStewardSub("inbox")}
        >
          📥 待处理 ${i>0?u`<span class="m-cnt-dot">${i}</span>`:_}
        </button>
        <button
          class="${e.stewardSub==="chat"?"on":""}"
          @click=${()=>t.onSelectStewardSub("chat")}
        >
          ✦ 问小智
        </button>
      </div>

      ${e.stewardSub==="activity"?u`
            <div class="m-sec-hd">
              <span>五步透明执行链路 (对齐 V5 #activity)</span>
              <span class="sub">严守真实物理回执 · 未知绝不伪装成功</span>
            </div>
            <div class="m-filter-row">
              <button
                class="m-fpill ${e.activityFilter==="all"?"on":""}"
                @click=${()=>t.onSelectActivityFilter("all")}
              >
                全部 (${e.activityChains.length})
              </button>
              <button
                class="m-fpill ${e.activityFilter==="ok"?"on":""}"
                @click=${()=>t.onSelectActivityFilter("ok")}
              >
                已回读确认 ✓
              </button>
              <button
                class="m-fpill ${e.activityFilter==="warn"?"on":""}"
                @click=${()=>t.onSelectActivityFilter("warn")}
              >
                未确认 / 安全拦截
              </button>
            </div>

            <div class="m-chain-list">
              ${s.map(a=>u`
                  <div class="m-chain-card ${a.status}">
                    <div class="m-cc-hd">
                      <div>
                        <span class="m-cc-room">${a.room}</span>
                        <span class="m-cc-title">${a.title}</span>
                      </div>
                      <span class="m-cc-status ${a.status}">${a.statusText}</span>
                    </div>
                    <div class="m-cc-time">${a.time} · 5 步全链路回执审计</div>
                    <div class="m-ladder">
                      <div class="m-step">
                        <span class="k">1. 触发源</span>
                        <span class="v">${a.trigger}</span>
                      </div>
                      <div class="m-step">
                        <span class="k">2. 感知条件</span>
                        <span class="v">${a.condition}</span>
                      </div>
                      <div class="m-step">
                        <span class="k">3. 管家决策</span>
                        <span class="v">${a.decision}</span>
                      </div>
                      <div class="m-step">
                        <span class="k">4. 动作下发</span>
                        <span class="v code">${a.action}</span>
                      </div>
                      <div class="m-step">
                        <span class="k">5. 物理回执</span>
                        <span class="v ${a.status}">${a.receipt}</span>
                      </div>
                    </div>
                  </div>
                `)}
            </div>
          `:e.stewardSub==="inbox"?u`
              <div class="m-sec-hd">
                <span>待处理中心 (对齐 V5 #inbox)</span>
                <span class="sub">集中处理主动询问、习惯候选与设备离线告警</span>
              </div>
              ${e.curQ?u`
                    <div class="q m-q">
                      <div class="hd">
                        <span>💡 实时询问 · ${e.qCounter}</span>
                        <span>高优先级</span>
                      </div>
                      <div class="qt">${e.curQ.q}</div>
                      <div class="acts">
                        <button class="chip-btn pri" @click=${()=>t.onAnswerQuestion("yes")}>同意执行</button>
                        <button class="chip-btn" @click=${()=>t.onAnswerQuestion("later")}>稍后</button>
                        <button class="chip-btn" @click=${()=>t.onAnswerQuestion("no")}>忽略</button>
                      </div>
                    </div>
                  `:_}

              <div class="m-chain-list">
                ${e.inboxItems.map(a=>u`
                    <div class="m-inbox-card ${a.resolved?"resolved":""}">
                      <div class="m-ic-top">
                        <span class="m-ic-tag ${a.kind}">${a.tag}</span>
                        <span class="m-ic-time">${a.time}</span>
                      </div>
                      <div class="m-ic-title">${a.title}</div>
                      <div class="m-ic-desc">${a.desc}</div>
                      ${a.resolved?u`<div class="m-ic-done">✓ 已处理归档</div>`:u`
                            <div class="acts" style="display:flex;gap:8px;margin-top:6px">
                              <button class="chip-btn pri" @click=${()=>t.onResolveInbox(a.id,!0)}>
                                ${a.kind==="habit"?"✓ 采纳为固定规则":"✓ 已知晓并核对"}
                              </button>
                              <button class="chip-btn" @click=${()=>t.onResolveInbox(a.id,!1)}>
                                暂不处理
                              </button>
                            </div>
                          `}
                    </div>
                  `)}
              </div>
            `:u`
              <div class="m-sec-hd">
                <span>自然语言对话管家</span>
                <span class="sub">支持直接控设备、查状态、生成场景草稿</span>
              </div>
              <div class="m-chat-box">
                <div class="m-chat-msgs">
                  ${e.chatMessages.map(a=>u`
                      <div class="m-cmsg ${a.role}">
                        <div class="m-cbubble">${a.text}</div>
                        <div class="m-ctime">${a.role==="ai"?"✦ 小智管家":"我"} · ${a.time}</div>
                      </div>
                    `)}
                </div>
                <div class="m-chat-Prompts">
                  ${["把客厅主灯调到 50%","开启主卧休息模式","放点爵士乐","查看全屋亮灯状态"].map(a=>u`
                      <button class="m-cprompt" @click=${()=>t.onSendChat(a)}>${a}</button>
                    `)}
                </div>
                <div class="m-chat-input-row">
                  <input
                    class="settings-input"
                    placeholder="对小智说点什么，如：把客厅灯关掉…"
                    .value=${e.chatInput}
                    @input=${a=>t.onChatInput(a.target.value)}
                    @keydown=${a=>{a.key==="Enter"&&t.onSendChat()}}
                  />
                  <button class="chip-btn pri" style="height:42px;padding:0 16px" @click=${()=>t.onSendChat()}>
                    发送
                  </button>
                </div>
              </div>
            `}
    </div>
  `}function Ze(e,t){const i=Object.values(e.roomRestMap).filter(Boolean).length;return u`
    <div class="m-tab-body">
      <!-- Natural Language Scene Draft Generator -->
      <div class="m-nl-card">
        <div class="m-nl-hd">
          <span>✦ 一句话生成 AI 场景草稿</span>
          <span class="pill" style="height:22px;font-size:10px">先草稿 · 审核后生效</span>
        </div>
        <div class="m-nl-desc">
          描述你想要的居家氛围，小智会自动解析房间与设备动作并生成「待审核草稿」，绝不未经确认私自改动家庭自动化。
        </div>
        <div class="m-nl-input-row">
          <input
            class="settings-input"
            placeholder="例如：每天22点半把主卧调成15%暖光并开24度睡眠空调"
            .value=${e.scenePromptInput}
            @input=${s=>t.onScenePromptInput(s.target.value)}
          />
          <button class="chip-btn pri" style="height:42px;padding:0 14px" @click=${()=>t.onCreateSceneDraft()}>
            生成草稿
          </button>
        </div>
        <div class="m-chat-Prompts" style="margin-top:6px">
          ${["观影微光：关主灯、灯带25%、关窗帘","专注办公：书房台灯85%冷白光、关客厅音乐"].map(s=>u`
              <button class="m-cprompt" @click=${()=>t.onCreateSceneDraft(s)}>+ ${s}</button>
            `)}
        </div>
      </div>

      <!-- Pending Scene Drafts -->
      ${e.sceneDrafts.length>0?u`
            <div class="m-sec-hd">
              <span>待审核 / 已生成场景草稿 (${e.sceneDrafts.length})</span>
              <span class="sub">对齐 /api/v1/ai-scenes/create-from-text</span>
            </div>
            <div class="m-chain-list">
              ${e.sceneDrafts.map(s=>u`
                  <div class="m-inbox-card">
                    <div class="m-ic-top">
                      <span class="m-ic-tag habit">${s.approved?"✓ 已批准进入场景库":"● 待主人审核草稿"}</span>
                      <span class="m-ic-time">AI 编排</span>
                    </div>
                    <div class="m-ic-title">${s.name}</div>
                    <div class="m-ic-desc">原始描述：“${s.prompt}”</div>
                    <div class="m-ic-desc" style="color:var(--primary);margin-top:2px">动作编排：${s.actionsSummary}</div>
                    <div class="acts" style="display:flex;gap:8px;margin-top:6px">
                      ${s.approved?_:u`
                            <button class="chip-btn pri" @click=${()=>t.onApproveSceneDraft(s.id)}>
                              ✓ 批准并加入常用场景
                            </button>
                          `}
                      <button class="chip-btn" @click=${()=>t.onDeleteSceneDraft(s.id)}>删除</button>
                    </div>
                  </div>
                `)}
            </div>
          `:_}

      <!-- Full Scenes Grid -->
      <div class="m-sec-hd">
        <span>全屋常用场景 (${e.scenes.length})</span>
        <span class="sub">离家与全屋关灯需按住 1 秒防误触</span>
      </div>
      <div class="m-scene-grid">
        ${e.scenes.map(s=>{const a=e.holdProgressMap[s.id]||0,n=ve(s);return u`
            <div
              class="scene m-scene-card"
              data-scene="${s.id}"
              @pointerdown=${d=>{s.hold&&t.onSceneHoldPointerDown(s,d)}}
              @click=${()=>{s.hold||t.onSceneClick(s)}}
            >
              <div class="bar" style="width:${a}%"></div>
              <div class="s-top">
                <div class="s-ico" style="color:${n.color}">${ue(s.id)}</div>
                <span class="s-tag">${n.tag}</span>
              </div>
              <div>
                <div class="s-name">${s.name}</div>
                <div class="s-desc">${s.desc}</div>
              </div>
            </div>
          `})}
      </div>

      <!-- V5 #auto Strategy Summary -->
      <div class="m-sec-hd">
        <span>管家主动策略摘要 (对齐 V5 #auto)</span>
        <span class="sub">无需复杂流程图 · 透明可控</span>
      </div>
      <div class="m-strategy-list">
        <div class="m-strat-item">
          <div>
            <div class="m-st-title">🚶 进出房间灯光跟随</div>
            <div class="m-st-desc">检测到有人进入且照度低于 40lx 自动缓亮；无人 5 分钟后自动缓灭</div>
          </div>
          <span class="pill occ">运行中</span>
        </div>
        <div class="m-strat-item">
          <div>
            <div class="m-st-title">🌙 房间休息免打扰保护</div>
            <div class="m-st-desc">
              当前已有 ${i} 个房间开启休息模式，休息房间内暂停主动亮灯与 TTS 播报
            </div>
          </div>
          <span class="pill">${i} 间开启</span>
        </div>
      </div>
    </div>
  `}function Xe(e,t){const i=ge(e.music),s=me(e.music);return u`
    <div class="m-tab-body">
      <!-- V5 r3 Security & Water/Gas Read-Only Status Board -->
      <div class="m-sec-hd">
        <span>安防与水电燃气看板 (V5 r3 只读契约)</span>
        <span class="sub">严格只读 · 零误触防线</span>
      </div>
      <div class="m-guard-banner">
        <div class="m-gb-ico">🛡</div>
        <div>
          <div class="m-gb-title">全屋安防与水电气处于受保护状态</div>
          <div class="m-gb-sub">
            为防止手机口袋误触或远场语音误解锁，门锁、摄像头、总水阀与燃气热水器遵循 V5 <b>r3 安全只读契约</b>，仅展示实时回读状态。
          </div>
        </div>
      </div>

      <div class="m-guard-grid">
        <div class="m-gcard" @click=${()=>t.onOpenSheet("e_lock")}>
          <div class="m-gc-top">
            <span class="m-gc-name">🔒 玄关智能门锁</span>
            <span class="m-badge lock">安全只读</span>
          </div>
          <div class="m-gc-val ok">已上锁 · 方舌已弹出</div>
          <div class="m-gc-meta">电量 86% · 最近：20:41 指纹开门</div>
        </div>
        <div class="m-gcard">
          <div class="m-gc-top">
            <span class="m-gc-name">📷 玄关猫眼与边缘视觉</span>
            <span class="m-badge lock">安全只读</span>
          </div>
          <div class="m-gc-val ok">布防在线 · 今日 0 异常</div>
          <div class="m-gc-meta">Frigate 本地检测 · 隐私遮罩正常</div>
        </div>
        <div class="m-gcard">
          <div class="m-gc-top">
            <span class="m-gc-name">💧 全屋智能水阀与水浸</span>
            <span class="m-badge lock">安全只读</span>
          </div>
          <div class="m-gc-val ok">总阀开启 · 厨卫干燥无漏水</div>
          <div class="m-gc-meta">水压正常 · 传感器在线</div>
        </div>
        <div class="m-gcard">
          <div class="m-gc-top">
            <span class="m-gc-name">🔥 燃气热水器与烟雾传感器</span>
            <span class="m-badge lock">安全只读</span>
          </div>
          <div class="m-gc-val ok">待机正常 · 恒温 42°C</div>
          <div class="m-gc-meta">CH4 / CO 浓度 0 ppm</div>
        </div>
      </div>

      <!-- Full Mobile Multi-Zone Music Player -->
      <div class="m-sec-hd">
        <span>全屋多房间音乐 (Music Assistant)</span>
        <span class="sub">${e.music.source}</span>
      </div>
      <div class="m-music-card">
        <div class="m-mc-top">
          <div class="m-mc-art" style="background:${i.color}">♪</div>
          <div style="flex:1;min-width:0">
            <div class="m-mc-tag">${i.name}</div>
            <div class="m-mc-title">${s.t}</div>
            <div class="m-mc-sub">${s.a} · ${ce(e.music.pos)} / ${ce(e.music.dur)}</div>
          </div>
          <div class="m-mc-ctrls">
            <button class="ibtn" style="width:38px;height:38px" @click=${()=>t.onMusicAction("prev")}>⏮</button>
            <button
              class="ibtn"
              style="width:44px;height:44px;background:var(--primary);color:#fff;border:none"
              @click=${()=>t.onMusicAction("toggle")}
            >
              ${e.music.playing?"⏸":"▶"}
            </button>
            <button class="ibtn" style="width:38px;height:38px" @click=${()=>t.onMusicAction("next")}>⏭</button>
          </div>
        </div>

        <div class="m-room-pills" style="padding:2px 0">
          ${e.music.playlists.map(a=>u`
              <button
                class="m-rpill ${e.music.playlistId===a.id?"active":""}"
                @click=${()=>t.onSelectPlaylist(a.id)}
              >
                ♪ ${a.name}
              </button>
            `)}
        </div>

        <div style="font-size:11px;color:var(--text2);margin-top:2px">播放房间分组（点按加入或退出）：</div>
        <div class="m-zone-chips">
          ${e.music.zones.map(a=>u`
              <button
                class="m-zchip ${a.joined?"on":""}"
                ?disabled=${!a.online}
                @click=${()=>t.onToggleMusicZone(a.room)}
              >
                <span>${a.name}</span>
                <span>${a.online?a.joined?`● ${a.vol}%`:"未加入":"离线"}</span>
              </button>
            `)}
        </div>
      </div>

      <!-- Host Connection & Accessibility Card -->
      <div class="m-sec-hd">
        <span>主机连接与显示偏好</span>
        <span class="sub">与如影中控屏共享网关令牌</span>
      </div>
      <div class="m-strategy-list">
        <div class="m-strat-item">
          <div>
            <div class="m-st-title">👵 长辈大字关怀模式</div>
            <div class="m-st-desc">放大手机端字号与触控按钮，精简次要参数展示</div>
          </div>
          <button class="tgl ${e.elderMode?"on":""}" @click=${t.onToggleElderMode}></button>
        </div>
        <div class="m-strat-item">
          <div>
            <div class="m-st-title">🔗 家庭网关配对与系统设置</div>
            <div class="m-st-desc">状态：${e.netLabel} · 支持局域网直连与远程中继</div>
          </div>
          <button class="chip-btn pri" @click=${t.onOpenSettings}>打开配置</button>
        </div>
      </div>
    </div>
  `}function Je(e,t){const i=me(e.music),s=e.music.zones.filter(n=>n.joined&&n.online).length,a=e.inboxItems.filter(n=>!n.resolved).length+(e.curQ?1:0);return u`
    <div class="m-shell ${e.elderMode?"elder":""}">
      <!-- Mobile Sticky Header -->
      <header class="m-header">
        <div class="m-brand">
          <div class="dot" style="width:28px;height:28px;border-radius:9px;font-size:13px">✦</div>
          <div>
            <div class="m-b-title">我的家 · 手机端 V5</div>
            <div class="m-b-sub">${e.greetingText}</div>
          </div>
        </div>
        <div class="m-hdr-right">
          <div class="status-pill" title="网关连接状态">
            <span class="sdot ${e.netTone==="warn"?"warn":e.netTone==="bad"?"bad":""}"></span>
            <span>${e.netTone==="ok"?"在家直连":"云端中继"}</span>
          </div>
          <button class="ibtn m-ibtn" title="切换深浅色主题" @click=${t.onToggleTheme}>
            ${e.themeMode==="dark"?"☀":"☾"}
          </button>
          <button
            class="ibtn m-ibtn"
            title="切换至如影墙面中控屏横屏布局"
            @click=${t.onSwitchToWallPanel}
          >
            🖥
          </button>
        </div>
      </header>

      <!-- Scrollable Tab Viewport -->
      <main class="m-viewport">
        ${e.tab==="home"?We(e,t):e.tab==="steward"?Qe(e,t):e.tab==="auto"?Ze(e,t):Xe(e,t)}
      </main>

      <!-- Floating Mini Music Bar + Glowing Xiaozhi Voice Trigger -->
      <div class="m-float-dock">
        <div
          class="m-mini-player ${e.music.playing&&e.music.linked?"playing":""}"
          @click=${()=>t.onSelectTab("guard")}
        >
          <span class="eq"><i></i><i></i><i></i></span>
          <div class="m-mp-info">
            <div class="m-mp-title">${i.t}</div>
            <div class="m-mp-sub">
              ${e.music.playing?`播放中 · ${s} 个房间`:"已暂停 · 点按进入音乐"}
            </div>
          </div>
          <button
            class="m-mp-btn"
            title="播放/暂停"
            @click=${n=>{n.stopPropagation(),t.onMusicAction("toggle")}}
          >
            ${e.music.playing?"⏸":"▶"}
          </button>
          <button
            class="m-mp-btn"
            title="下一首"
            @click=${n=>{n.stopPropagation(),t.onMusicAction("next")}}
          >
            ⏭
          </button>
        </div>

        <button class="m-voice-fab" title="唤醒小智语音管家" @click=${t.onOpenVoice}>
          <div class="orb" style="width:32px;height:32px"></div>
          <span>叫小智</span>
        </button>
      </div>

      <!-- 4-Tab Bottom Navigation Bar -->
      <nav class="m-tabbar" role=" navigation" aria-label="手机端底部导航">
        <button class="m-tab-btn ${e.tab==="home"?"active":""}" @click=${()=>t.onSelectTab("home")}>
          <span class="ico">🏠</span>
          <span class="lbl">家</span>
        </button>
        <button class="m-tab-btn ${e.tab==="steward"?"active":""}" @click=${()=>t.onSelectTab("steward")}>
          <span class="ico">
            ✦
            ${a>0?u`<i class="m-nav-dot"></i>`:_}
          </span>
          <span class="lbl">管家与记录</span>
        </button>
        <button class="m-tab-btn ${e.tab==="auto"?"active":""}" @click=${()=>t.onSelectTab("auto")}>
          <span class="ico">⚡</span>
          <span class="lbl">场景与自动</span>
        </button>
        <button class="m-tab-btn ${e.tab==="guard"?"active":""}" @click=${()=>t.onSelectTab("guard")}>
          <span class="ico">🛡</span>
          <span class="lbl">守护与音乐</span>
        </button>
      </nav>
    </div>
  `}var Ke=Object.defineProperty,Ye=Object.getOwnPropertyDescriptor,x=(e,t,i,s)=>{for(var a=s>1?void 0:s?Ye(t,i):t,n=e.length-1,d;n>=0;n--)(d=e[n])&&(a=(s?d(t,i,a):d(a))||a);return s&&a&&Ke(t,i,a),a};function et(){return typeof le=="function"?le():{rooms:[],devs:[],scenes:[],music:{linked:!0,source:"Music Assistant · 本地无损",playing:!0,shuffle:!1,sleepMin:0,ducked:!1,receipt:null,playlistId:"jazz",trackIdx:0,pos:84,dur:228,masterVol:38,zones:[],playlists:[{id:"jazz",name:"爵士",desc:"",color:"#7C8CFF",tag:"JAZZ",tracks:[{t:"Blue in Green",a:"Miles Davis",dur:228}]}]},questions:[],feed:{txt:"",undone:!1,muted:!1}}}let f=class extends be{constructor(){super(...arguments),this.activeRoomId="all",this.themeMode="dark",this.clockText="20:36",this.dateText="11月4日 · 星期三",this.greetingText="晚上好 · 全屋舒适",this._initData=et(),this.rRooms=this._initData.rooms,this.rDevs=this._initData.devs,this.rScenes=this._initData.scenes,this.rMusic=this._initData.music,this.rQuestions=this._initData.questions,this.qIdx=0,this.rFeed=this._initData.feed,this.sheetDevId=null,this.holdProgressMap={},this.lockHoldPct=0,this.voiceModalOpen=!1,this.voiceTranscript="正在听你说…",this.voiceStageIdx=0,this.voiceReply="",this.isAmbientMode=!1,this.showSettingsDrawer=!1,this.settingsTab="display",this.screenBriPct=78,this.saverTimeoutMin=1,this.ttsVolPct=72,this.wakeEnabled=!0,this.wakeSensitivity="mid",this.musicDuckEnabled=!0,this._initMobile=typeof de=="function"?de():{activityChains:[],inboxItems:[],sceneDrafts:[],chatMessages:[]},this._manualLayoutOverride=null,this.isMobileLayout=!1,this.mobileTab="home",this.mobileStewardSub="activity",this.mobileActivityFilter="all",this.mobileElderMode=!1,this.roomRestMap={master:!1,living:!1},this.mobileActivityChains=this._initMobile.activityChains,this.mobileInboxItems=this._initMobile.inboxItems,this.mobileSceneDrafts=this._initMobile.sceneDrafts,this.mobileScenePromptInput="",this.mobileChatMessages=this._initMobile.chatMessages,this.mobileChatInput="",this.aiState={status:"idle",lastAction:"",lastCorrection:"",recentAiActions:[],actionHistory:[],frigateEvents:[],criticalEvent:null,presenceState:{}},this.devices={},this.energyStats=[],this.activeDetailDevice=null,this.gatewayUrlInput="",this.pairingTokenInput="",this.pairingBusy=!1,this.pairingHint="",this.pairingExpressStatus="idle",this.pairingQrDataUrl="",this.connectionState="connecting",this.feedStatus={},this.voiceStage="idle",this.voiceReplyText="",this.wakewordEnabled=!1,this.scenes=[],this.pendingDeviceControlConfirmation=null,this.actionNotice=null,this.voicePipeline=null,this.idleTimer=null,this.clockTimer=null,this.musicTimer=null,this.liveSyncTimer=null,this.voiceDemoTimers=[],this.actionNoticeTimer=null,this.deviceRefreshTimers=new Set,this._prevMusicPlaying=!1,this._syncViewportLayoutMode=()=>{var i;if(typeof window>"u")return;if(this._manualLayoutOverride){this.isMobileLayout=this._manualLayoutOverride==="mobile";return}const e=new URLSearchParams(((i=window.location)==null?void 0:i.search)||""),t=(e.get("view")||e.get("mode")||"").toLowerCase();if(t==="mobile"||t==="phone"){this.isMobileLayout=!0;return}if(t==="wall"||t==="screen"||t==="panel"){this.isMobileLayout=!1;return}this.isMobileLayout=(window.innerWidth||1280)<=820},this._handleKeyDown=e=>{this._resetIdleTimer(),e.key==="Escape"&&(this.sheetDevId=null,this.showSettingsDrawer=!1,this.voiceModalOpen&&this._closeVoiceOverlay(),this.isAmbientMode&&(this.isAmbientMode=!1))},this._resetIdleTimer=()=>{typeof window>"u"||(this.idleTimer&&clearTimeout(this.idleTimer),this.idleTimer=window.setTimeout(()=>{!this.voiceModalOpen&&!this.sheetDevId&&!this.showSettingsDrawer&&(this.isAmbientMode=!0)},6e4))},this._audioCtx=null,this._audioChordTimer=null,this._streamAudioEl=null,this._handleTilePointerDown=(e,t)=>{if(e.offline||e.type==="sensor")return;if(e.type==="speaker"){this._handleSpeakerTileGesture(e.room,t);return}const i=t.currentTarget,s=t.clientX,a=t.clientY;let n=!1,d=!1;const c=i.getBoundingClientRect(),r=e.type==="light"&&!!e.dimmable,h=window.setTimeout(()=>{n||(d=!0,this.sheetDevId=e.id)},420),g=k=>{const o=k.clientX-s,l=k.clientY-a;if((Math.abs(o)>8||Math.abs(l)>8)&&(n=!0,clearTimeout(h)),n&&r){const v=Math.max(5,Math.min(100,Math.round((k.clientX-c.left)/c.width*100)));e.on=!0,e.bri=v,this.rDevs=[...this.rDevs]}},y=()=>{clearTimeout(h),window.removeEventListener("pointermove",g),window.removeEventListener("pointerup",y),!d&&(n&&r?this._sendDevCommand(e,()=>{}):(!n||!r)&&this._toggleDev(e.id))};window.addEventListener("pointermove",g),window.addEventListener("pointerup",y)},this._webSpeechWakeRecognizer=null,this._openVoiceOverlay=()=>{this.voiceModalOpen=!0,this._prevMusicPlaying=this.rMusic.linked&&this.rMusic.playing,this._prevMusicPlaying&&(this.rMusic={...this.rMusic,ducked:!0},this._syncWebAudioEngine(this.rMusic)),this.voiceStageIdx=0,this.voiceTranscript="正在听你说…",this.voiceReply="",this._initVoiceAndWakeEngines(),this.connectionState==="connected"&&this.voicePipeline?this.voicePipeline.start().catch(()=>{this._runDemoVoiceSequence()}):this._runDemoVoiceSequence()},this._closeVoiceOverlay=()=>{this.voiceModalOpen=!1,this.voiceDemoTimers.forEach(e=>clearTimeout(e)),this.voiceDemoTimers=[],this.rMusic.ducked&&(this.rMusic={...this.rMusic,ducked:!1},this._syncWebAudioEngine(this.rMusic)),this.voicePipeline&&this.voicePipeline.stop()}}connectedCallback(){var t,i,s,a,n,d,c;if(super.connectedCallback(),typeof window>"u")return;const e=O;this.gatewayUrlInput=((t=e==null?void 0:e.getGatewayUrl)==null?void 0:t.call(e))||"",this._tickClock(),this.clockTimer=window.setInterval(()=>this._tickClock(),1e3),this.musicTimer=window.setInterval(()=>this._tickMusic(),1e3),this.liveSyncTimer=window.setInterval(()=>{this._fetchLiveGatewayData()},15e3),this._resetIdleTimer(),window.addEventListener("pointerdown",this._resetIdleTimer,{passive:!0}),window.addEventListener("keydown",this._handleKeyDown),window.addEventListener("resize",this._syncViewportLayoutMode),this._syncViewportLayoutMode(),e&&(typeof e.getConnectionState=="function"&&(this.connectionState=e.getConnectionState()),typeof e.getFeedStatus=="function"&&(this.feedStatus=e.getFeedStatus()),(i=e.subscribe)==null||i.call(e,(r,h,g,y,k,o,l)=>{if(Array.isArray(r)){const v={};r.forEach(m=>{(m!=null&&m.id||m!=null&&m.entity_id)&&(v[m.entity_id||m.id]=m)}),this.devices=v}else r&&typeof r=="object"&&(this.devices={...r});h&&typeof h=="object"&&(this.aiState={...h},h.lastAction&&(this.rFeed={txt:h.lastAction,undone:!1,muted:!1})),Array.isArray(g)&&(this.energyStats=[...g]),l&&typeof l=="object"&&(this.feedStatus={...l}),this._syncGatewayToRedesign()}),(s=e.subscribeAI)==null||s.call(e,r=>{this.aiState={...r},r!=null&&r.lastAction&&(this.rFeed={txt:r.lastAction,undone:!1,muted:!1})}),(a=e.subscribeEnergy)==null||a.call(e,r=>{this.energyStats=Array.isArray(r)?[...r]:[]}),(n=e.subscribeConnection)==null||n.call(e,r=>{this.connectionState=r}),(d=e.subscribeFeedStatus)==null||d.call(e,r=>{this.feedStatus={...r}}),(c=e.connect)==null||c.call(e),this._fetchGatewayScenes()),this._fetchLiveGatewayData(),this._initVoiceAndWakeEngines()}disconnectedCallback(){super.disconnectedCallback(),!(typeof window>"u")&&(this.clockTimer&&clearInterval(this.clockTimer),this.musicTimer&&clearInterval(this.musicTimer),this.liveSyncTimer&&clearInterval(this.liveSyncTimer),this.idleTimer&&clearTimeout(this.idleTimer),window.removeEventListener("pointerdown",this._resetIdleTimer),window.removeEventListener("keydown",this._handleKeyDown),window.removeEventListener("resize",this._syncViewportLayoutMode))}_toggleRoomRestMode(e){var s;const t=!this.roomRestMap[e];this.roomRestMap={...this.roomRestMap,[e]:t};const i=((s=this.rRooms.find(a=>a.id===e))==null?void 0:s.name)||e;if(this.rFeed={txt:t?`🌙 已开启「${i}」休息免打扰模式：暂停该房间主动亮灯与语音打扰。`:`☀ 已关闭「${i}」休息模式：恢复正常灯光跟随与管家播报。`,undone:!1,muted:!1},this.connectionState==="connected"){const a=!t;this._postGatewayJson(`/api/v1/rooms/${encodeURIComponent(e)}/rest/toggle`,{rest_mode:t}).catch(n=>{this.roomRestMap={...this.roomRestMap,[e]:a},this._showExecutionFailure(n)})}}_appendMobileActivityChain(e){const t=new Date,i=`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}:${String(t.getSeconds()).padStart(2,"0")}`,s={...e,id:`act_${Date.now()}_${Math.random().toString(36).slice(2,6)}`,time:i};this.mobileActivityChains=[s,...this.mobileActivityChains.slice(0,19)]}_handleCreateMobileSceneDraft(e){const t=(e??this.mobileScenePromptInput).trim();if(!t)return;const i=t.length>10?`${t.slice(0,10)}…`:t,s={id:`draft_${Date.now()}`,name:`AI 草稿 · ${i}`,prompt:t,actionsSummary:"已解析房间与设备动作链 · 待主人确认后生效",approved:!1};this.mobileSceneDrafts=[s,...this.mobileSceneDrafts],this.mobileScenePromptInput="",this.rFeed={txt:`✦ 已根据“${t}”生成待审核场景草稿，请在「场景与自动」中确认启用。`,undone:!1,muted:!1},this.connectionState==="connected"&&this._postGatewayJson("/api/v1/ai-scenes/create-from-text",{text:t,auto_approve:!1}).catch(a=>{this._showExecutionFailure(a)})}_handleSendMobileChat(e){const t=(e??this.mobileChatInput).trim();if(!t)return;const i=new Date,s=`${String(i.getHours()).padStart(2,"0")}:${String(i.getMinutes()).padStart(2,"0")}`;this.mobileChatMessages=[...this.mobileChatMessages,{role:"user",text:t,time:s}],this.mobileChatInput="";let a="已收到你的指令，小智正在为你核对全屋状态。";if(t.includes("休息模式")){const n=this.rRooms.find(d=>t.includes(d.name))||this.rRooms.find(d=>d.id==="master")||this.rRooms[0];n&&(this._toggleRoomRestMode(n.id),a=`✓ 已为你切换「${n.name}」的休息免打扰模式，物理状态已同步。`)}else if(t.includes("亮灯状态")||t.includes("几盏灯")){const n=this.rDevs.filter(d=>d.type==="light"&&d.on&&!d.offline);a=n.length>0?`当前共有 ${n.length} 盏灯亮起：${n.map(d=>d.name).join("、")}。`:"当前全屋所有照明均已关闭。"}else{const n=this._tryMatchMusicVoiceCommand(t);n?a=`✓ ${n}`:(this._executeWebWakeFreeCommand(`帮我${t}`),a=`✓ ${this.rFeed.txt}`)}this.mobileChatMessages=[...this.mobileChatMessages,{role:"ai",text:a,time:s}]}_tickClock(){const e=new Date,t=String(e.getHours()).padStart(2,"0"),i=String(e.getMinutes()).padStart(2,"0");this.clockText=`${t}:${i}`;const s=["日","一","二","三","四","五","六"][e.getDay()];this.dateText=`${e.getMonth()+1}月${e.getDate()}日 · 星期${s}`;const a=e.getHours(),n=a<6?"夜深了":a<11?"早上好":a<14?"中午好":a<18?"下午好":"晚上好";this.greetingText=`${n} · 全屋舒适`}_tickMusic(){if(!this.rMusic.linked||!this.rMusic.playing)return;const e=(this.rMusic.pos+1)%Math.max(1,this.rMusic.dur);this.rMusic={...this.rMusic,pos:e}}_syncGatewayToRedesign(){var i,s,a,n,d;const e=Object.values(this.devices);if(!e.length)return;const t=[...this.rDevs];for(const c of e){const r=String(c.entity_id||c.id||""),h=r.split(".")[0];if(!["light","climate","cover","switch","fan","lock","media_player"].includes(h))continue;ye(((i=c.attributes)==null?void 0:i.room_name)||((s=c.attributes)==null?void 0:s.friendly_name)||"");const g=t.find(o=>{var l;return o.entityId===r||o.name===((l=c.attributes)==null?void 0:l.friendly_name)||o.name===c.name}),y=!["off","unavailable","unknown","closed","idle","standby"].includes(String(c.state).toLowerCase()),k=String(c.state).toLowerCase()==="unavailable";g&&(g.entityId=r,g.on=y,g.offline=k,typeof((a=c.attributes)==null?void 0:a.brightness)=="number"&&(g.bri=Math.round(c.attributes.brightness/255*100)),typeof((n=c.attributes)==null?void 0:n.temperature)=="number"&&(g.temp=c.attributes.temperature),typeof((d=c.attributes)==null?void 0:d.current_position)=="number"&&(g.pos=c.attributes.current_position))}this.rDevs=t}async _fetchGatewayScenes(){var e,t;try{const i=O,s=((e=i==null?void 0:i.getGatewayUrl)==null?void 0:e.call(i))||"";if(!s)return;const a=((t=i==null?void 0:i.getAuthToken)==null?void 0:t.call(i))||"",n=await fetch(`${s}/api/screen/scenes`,{headers:a?{Authorization:`Bearer ${a}`}:{}});if(!n.ok)return;const d=await n.json(),c=Array.isArray(d==null?void 0:d.items)?d.items:Array.isArray(d)?d:[];this.scenes=we(c)}catch{}}async _fetchLiveGatewayData(){var i;if(typeof window>"u"||typeof fetch!="function")return;const e=localStorage.getItem("screen_token")||"";if(!e&&((i=window.location)==null?void 0:i.port)!=="5173")return;const t={Accept:"application/json"};e&&(t.Authorization=`Bearer ${e}`);try{const[s,a,n,d,c]=await Promise.allSettled([fetch("/api/v1/rooms",{headers:t}),fetch("/api/v1/devices",{headers:t}),fetch("/api/v1/ai-scenes",{headers:t}),fetch("/api/v1/screen/status",{headers:t}),fetch("/api/v1/owner-questions",{headers:t})]),r=async M=>M.status!=="fulfilled"||!M.value.ok?null:M.value.json().catch(()=>null),[h,g,y,k,o]=await Promise.all([r(s),r(a),r(n),r(d),r(c)]),l=Array.isArray(h)?h:(h==null?void 0:h.rooms)||(h==null?void 0:h.items)||[],v=Array.isArray(g)?g:(g==null?void 0:g.devices)||(g==null?void 0:g.items)||[],m=Array.isArray(y)?y:(y==null?void 0:y.scenes)||(y==null?void 0:y.items)||[];if(l.length===0&&v.length===0)return;this.connectionState="connected";const $=Ie(l,v,m,k,o,this._initData.devs,this._initData.scenes,this._initData.questions);$.rooms.length>0&&(this.rRooms=$.rooms),$.devs.length>0&&(this.rDevs=$.devs),$.scenes.length>0&&(this.rScenes=$.scenes),$.feedTxt&&(this.rFeed={txt:$.feedTxt,undone:!1,muted:!1}),$.questions.length>0&&(this.rQuestions=$.questions);const D=v.filter(M=>String((M==null?void 0:M.entity_id)||(M==null?void 0:M.id)||"").startsWith("media_player.")).map(M=>({id:String(M.entity_id||M.id),name:String(M.friendly_name||M.name||M.entity_id||"HA 媒体播放器"),state:String(M.state||"idle")}));D.length>0&&(this.rMusic={...this.rMusic,haMediaEntities:D,selectedHaMediaId:this.rMusic.selectedHaMediaId||D[0].id})}catch{}}_createActionRequestId(){return`screen_${Date.now().toString(36)}_${Math.random().toString(36).slice(2,8)}`}_showActionNotice(e,t="info",i=5e3,s=void 0,a=void 0){this.actionNoticeTimer&&typeof window<"u"&&(window.clearTimeout(this.actionNoticeTimer),this.actionNoticeTimer=null),this.actionNotice={text:e,tone:t,request:s,receipt:a},i>0&&typeof window<"u"&&typeof window.setTimeout=="function"&&(this.actionNoticeTimer=window.setTimeout(()=>{this.actionNotice=null,this.actionNoticeTimer=null},i))}_executionFailureMessage(e){const t=e instanceof Error?e.message:String(e||"");if(e instanceof se)return e.status===401||e.status===403||t.includes("PAIRING")||t.includes("AUTH")?"中控屏配对凭证已失效，请重新配对后再试（未执行设备动作）":e.status===400||e.status===422?"请求参数无效，未发送动作":e.status===409||e.status===423||t.includes("conflict")||t.includes("rejected")?"该操作已被网关拒绝，请核对当前设备状态":"执行结果未知，请核对设备状态；不会自动重发请求";if(t.includes("invalid_screen_service_call")||t.includes("missing_entity_id"))return"控制参数不完整，未发送动作";const i=typeof re=="function"?re(t):null;return i||"执行结果未知，请核对设备状态；不会自动重发请求"}_showExecutionFailure(e,t=void 0){const i=this._executionFailureMessage(e),s=i.includes("拒绝")||i.includes("未发送")||i.includes("失效");this._showActionNotice(i,s?"error":"warning",8e3,t)}async _readGatewayJsonResponse(e){const t=await e.text();let i={};if(t)try{const s=JSON.parse(t);s&&typeof s=="object"&&(i=s)}catch{i={raw:t}}if(!e.ok){const s=String(i.error||i.detail||i.message||`http_${e.status}`);throw new se(e.status,s)}return i}async _postGatewayJson(e,t,i={}){var r,h;const s=O,a=((r=s==null?void 0:s.getGatewayUrl)==null?void 0:r.call(s))||"",n=((h=s==null?void 0:s.getAuthToken)==null?void 0:h.call(s))||"",d={"Content-Type":"application/json",...n?{Authorization:`Bearer ${n}`}:{},...i},c=await fetch(`${a}${e}`,{method:"POST",headers:d,body:JSON.stringify(t)});return this._readGatewayJsonResponse(c)}async _executeServiceThroughGateway(e,t=this._createActionRequestId()){var d;const i=(d=e==null?void 0:e.data)==null?void 0:d.entity_id,s=Array.isArray(i)?String(i[0]||""):String(i||"");if(!s||!(e!=null&&e.domain)||!(e!=null&&e.service))throw new Error("invalid_screen_service_call");const a=oe(s),n=ne(e,t);return this._postGatewayJson(a,n,{"X-Request-Id":t})}_refreshDeviceStateAfterGatewayAction(){var t;const e=O;if(e&&((t=e.refreshDevicesNow)==null||t.call(e),typeof window<"u"&&typeof window.setTimeout=="function")){const i=window.setTimeout(()=>{var s;this.deviceRefreshTimers.delete(i),(s=e.refreshDevicesNow)==null||s.call(e)},900);this.deviceRefreshTimers.add(i)}}_applyTerminalDeviceControlReceipt(e,t=void 0){if(e.effectStatus==="verified_success"){this._showActionNotice("设备状态已回读确认","success",3200,t,e),this._refreshDeviceStateAfterGatewayAction();return}this._showActionNotice("执行结果未知，请核对设备状态；不会自动重发请求","warning",8e3,t,e)}async _handleServiceCall(e){var d;const t=e.detail,i=(d=t==null?void 0:t.data)==null?void 0:d.entity_id,s=Array.isArray(i)?String(i[0]||""):String(i||""),a=this._createActionRequestId(),n={requestId:a,entityId:s};try{const c=await this._executeServiceThroughGateway(t,a),r=ke(c);if(r){this.pendingDeviceControlConfirmation={entityId:s,detail:t,requestId:a,challenge:r,responsePayload:c},this._showActionNotice("高风险操作需主人确认后再执行","warning",8e3,n);return}const h=ae(c,a);if(h){this._applyTerminalDeviceControlReceipt(h,n);return}this._showActionNotice("执行请求已提交，等待设备状态回流确认","info",4e3,n),this._refreshDeviceStateAfterGatewayAction()}catch(c){this._showExecutionFailure(c,n)}}async _confirmPendingDeviceControl(){const e=this.pendingDeviceControlConfirmation;if(!e)return;this.pendingDeviceControlConfirmation=null;const t={requestId:e.requestId,entityId:e.entityId};try{const i=e.challenge.confirmPath||oe(e.entityId),s={...ne(e.detail||{service:""},e.requestId),confirmed:!0,claim_id:e.challenge.claimId,binding_digest:e.challenge.bindingDigest},a=await this._postGatewayJson(i,s,{"X-Request-Id":e.requestId}),n=ae(a,e.requestId,e.challenge.bindingDigest,e.challenge.claimId);if(n){this._applyTerminalDeviceControlReceipt(n,t);return}this._showActionNotice("确认请求已提交，等待设备状态回流确认","info",4e3,t),this._refreshDeviceStateAfterGatewayAction()}catch(i){this._showExecutionFailure(i,t)}}_formatTodayEnergyKwh(e){if(!Array.isArray(e)||e.length===0)return"暂无日统计";const t=e.reduce((i,s)=>i+(Number((s==null?void 0:s.kwh)??(s==null?void 0:s.value))||0),0);return t>0?`${t.toFixed(1)} kWh`:"暂无日统计"}_sendDevCommand(e,t){if(!(e.offline||e.type==="sensor")){if(e.receipt="sending",this.rDevs=[...this.rDevs],e.entityId&&this.connectionState==="connected"){const i=e.entityId.split(".")[0]||"light",s={...e};t(s);const a=s.on?"turn_on":"turn_off";this._handleServiceCall({detail:{domain:i,service:a,data:{entity_id:e.entityId}}});return}window.setTimeout(()=>{var s;const i=((s=this.rRooms.find(a=>a.id===e.room))==null?void 0:s.name)||e.room;e.failNext?(e.receipt="unknown",e.failNext=!1,this._appendMobileActivityChain({title:`${e.name} 控制回执未知`,room:i,trigger:`手动触控 (${this.isMobileLayout?"手机端 V5":"如影中控屏 V5"})`,condition:"网关已受理 · 等待设备状态回流超时",decision:"遵守真实回执契约：标记未知，不自动重发",action:`${e.type}.control(${e.id})`,receipt:"! 回执未知 · 请核对物理状态",status:"unknown",statusText:"未确认 · 不自动重发"})):(t(e),e.receipt="ok",this._appendMobileActivityChain({title:`${e.name} 已${e.on?"开启/调节":"关闭"}`,room:i,trigger:`手动触控 (${this.isMobileLayout?"手机端 V5":"如影中控屏 V5"})`,condition:"房间在线 · 非冲突状态",decision:"即时下发控制并校验状态回流",action:`${e.type}.${e.on?"turn_on":"turn_off"}(${e.id}${e.type==="light"&&e.dimmable?`, bri=${e.bri??80}%`:""})`,receipt:"已回读确认 ✓ (34ms)",status:"ok",statusText:"已回读确认 ✓"}),window.setTimeout(()=>{e.receipt==="ok"&&(e.receipt=null,this.rDevs=[...this.rDevs])},1600)),this.rDevs=[...this.rDevs]},340)}}_syncWebAudioEngine(e){if(typeof window>"u")return;const t=e.engineMode||"local_synth",i=e.linked&&e.playing,s=Math.max(.02,Math.min(1,(e.ducked?Math.min(e.masterVol,16):e.masterVol)/100*.35));if(!i||t!=="open_stream")this._streamAudioEl&&this._streamAudioEl.pause();else if(t==="open_stream"){const a=e.streamUrl||"https://ice2.somafm.com/lush-128-mp3";this._streamAudioEl?this._streamAudioEl.src!==a&&(this._streamAudioEl.src=a):this._streamAudioEl=new Audio(a),this._streamAudioEl.volume=Math.max(0,Math.min(1,(e.ducked?Math.min(e.masterVol,16):e.masterVol)/100)),this._streamAudioEl.play().catch(()=>{})}if(!i||t!=="local_synth"){this._audioChordTimer&&(window.clearInterval(this._audioChordTimer),this._audioChordTimer=null);return}try{const a=window.AudioContext||window.webkitAudioContext;if(!a||(this._audioCtx||(this._audioCtx=new a),this._audioCtx.state==="suspended"&&this._audioCtx.resume(),this._audioChordTimer))return;let n=0;const d=()=>{if(!this.rMusic.playing||!this.rMusic.linked||(this.rMusic.engineMode||"local_synth")!=="local_synth")return;const c=this._audioCtx;if(!c)return;const r={jazz:[[261.63,329.63,392,493.88],[293.66,349.23,440,523.25],[196,246.94,329.63,392]],morning:[[261.63,329.63,392],[349.23,440,523.25],[392,493.88,587.33]],focus:[[220,261.63,329.63],[174.61,220,261.63],[196,246.94,293.66]],sleep:[[130.81,196,246.94],[146.83,220,261.63]]},h=r[this.rMusic.playlistId]||r.jazz,g=h[n%h.length];n+=1;const y=c.currentTime;g.forEach((k,o)=>{const l=c.createOscillator(),v=c.createGain();l.type="sine",l.frequency.setValueAtTime(k,y),v.gain.setValueAtTime(1e-4,y),v.gain.exponentialRampToValueAtTime(s/(g.length+o*.4),y+.35),v.gain.exponentialRampToValueAtTime(1e-4,y+2.2),l.connect(v),v.connect(c.destination),l.start(y),l.stop(y+2.3)})};d(),this._audioChordTimer=window.setInterval(d,2400)}catch{}}async _searchOnlineMusic(e,t=!0){const i=(e||"").trim();if(i){this.rMusic={...this.rMusic,searchQuery:i,searching:!0,searchStatus:`正在直连检索「${i}」在线曲目（无需如影云中转）…`};try{const s=encodeURIComponent(i);let a=[];for(const h of["HK","TW","SG","US"]){const g=await fetch(`https://itunes.apple.com/search?term=${s}&media=music&entity=song&limit=8&country=${h}&lang=zh_cn`);if(g.ok){const y=await g.json();if(Array.isArray(y==null?void 0:y.results)&&y.results.length>0&&(a=y.results.filter(k=>k==null?void 0:k.previewUrl),a.length>0))break}}if(a.length===0){this.rMusic={...this.rMusic,searching:!1,searchStatus:`未检索到「${i}」的直连音频流，已为您开启本机环境音源`};return}const n=a.slice(0,8).map(h=>({t:String(h.trackName||h.collectionName||i),a:`${h.artistName||"在线曲库"}${h.collectionName?` · ${h.collectionName}`:""}`,dur:Math.max(15,Math.min(300,Math.round((Number(h.trackTimeMillis)||3e4)/1e3))),streamUrl:String(h.previewUrl),albumArtUrl:String(h.artworkUrl100||"")})),d={id:"online_search",name:`在线直连 · ${i}`,desc:`直连曲库搜索结果（共 ${n.length} 首 · 无需厂家中转）`,color:"linear-gradient(135deg,#00C48C,#38D5F5)",tag:"DIRECT MUSIC",tracks:n},c=this.rMusic.playlists.filter(h=>h.id!=="online_search"),r={...this.rMusic,searching:!1,searchStatus:`已找到 ${n.length} 首「${i}」直连曲目 · 正在播放《${n[0].t}》`,playlists:[d,...c],playlistId:"online_search",trackIdx:0,pos:0,dur:n[0].dur,engineMode:"open_stream",streamUrl:n[0].streamUrl,source:`直连在线曲库 · ${i}`,playing:t?!0:this.rMusic.playing};this.rMusic=r,this._syncWebAudioEngine(r)}catch{this.rMusic={...this.rMusic,searching:!1,searchStatus:"在线曲库检索暂时受限，可直接使用中控屏本机内置合成器"}}}}_tryMatchMusicVoiceCommand(e){const t=e.replace(/^[，。！？,.!?\s]+|[，。！？,.!?\s]+$/g,"").replace(/^(小智小智|你好小智|小智|帮我|请帮我|麻烦帮我|请)+/g,"").trim();if(!t)return null;if(/^(暂停音乐|停止音乐|关掉音乐|关闭音乐|暂停播放|停止播放|音乐暂停|别唱了)$/.test(t))return this._sendMusicCommand(s=>{s.playing=!1}),"已暂停中控屏音乐";if(/^(下一首|切歌|换一首歌|换首歌|下一曲)$/.test(t))return this._sendMusicCommand(s=>{const a=s.playlists.find(d=>d.id===s.playlistId)||s.playlists[0];s.trackIdx=(s.trackIdx+1)%a.tracks.length,s.pos=0;const n=a.tracks[s.trackIdx];s.dur=n.dur,n.streamUrl&&(s.engineMode="open_stream",s.streamUrl=n.streamUrl),s.playing=!0}),"已切换到下一首音乐";if(/^(上一首|上一曲)$/.test(t))return this._sendMusicCommand(s=>{const a=s.playlists.find(d=>d.id===s.playlistId)||s.playlists[0];s.trackIdx=(s.trackIdx-1+a.tracks.length)%a.tracks.length,s.pos=0;const n=a.tracks[s.trackIdx];s.dur=n.dur,n.streamUrl&&(s.engineMode="open_stream",s.streamUrl=n.streamUrl),s.playing=!0}),"已切换到上一首音乐";if(/^(播放音乐|打开音乐|放点音乐|放首歌|来点音乐|继续播放|恢复播放|开始播放音乐)$/.test(t))return this.activeRoomId="music",this._sendMusicCommand(s=>{s.linked=!0,s.playing=!0}),"已为您开启中控屏音乐播放";const i=t.match(/^(?:播放|放一首|放首|来一首|来首|听一下|我想听|搜索并播放|点播)(.+)$/);if(i){const s=i[1].replace(/(的歌|的音乐|歌曲|音乐)$/g,"").replace(/的/g," ").trim();if(s&&!/(灯|空调|窗帘|电视|插座|新风|场景|模式)/.test(s))return this.activeRoomId="music",this._searchOnlineMusic(s,!0),`正在为您搜索并播放「${s}」`}return null}_sendMusicCommand(e){const t=this.rMusic.playing,i=this.rMusic.trackIdx,s=this.rMusic.masterVol;this.rMusic={...this.rMusic,receipt:"sending"},window.setTimeout(()=>{const a={...this.rMusic};if(e(a),a.receipt="ok",this.rMusic=a,this._syncWebAudioEngine(a),a.engineMode==="ha_media"&&a.selectedHaMediaId&&this.connectionState==="connected"){const n=a.selectedHaMediaId;a.playing!==t?this._handleServiceCall({detail:{domain:"media_player",service:a.playing?"media_play":"media_pause",data:{entity_id:n}}}):a.trackIdx!==i?this._handleServiceCall({detail:{domain:"media_player",service:"media_next_track",data:{entity_id:n}}}):a.masterVol!==s&&this._handleServiceCall({detail:{domain:"media_player",service:"volume_set",data:{entity_id:n,volume_level:a.masterVol/100}}})}window.setTimeout(()=>{this.rMusic.receipt==="ok"&&(this.rMusic={...this.rMusic,receipt:null})},1400)},260)}_toggleDev(e){const t=this.rDevs.find(i=>i.id===e);if(!(!t||t.offline||t.type==="sensor")){if(t.type==="lock"){this.sheetDevId=t.id;return}this._sendDevCommand(t,i=>{i.on=!i.on,i.type==="curtain"&&(i.pos=i.on?100:0)})}}_runScene(e){const t=e.id;if(t==="home")this.rDevs.forEach(i=>{i.room==="living"&&i.type==="light"&&(i.on=!0,i.bri=75),i.id==="l_ac"&&(i.on=!0,i.temp=25),i.id==="l_cur"&&(i.on=!0,i.pos=80)}),this.rFeed={txt:"已执行「回家」：客厅主灯与灯带开启，空调 25°，纱帘打开 80%。",undone:!1,muted:!1};else if(t==="away"||t==="alloff")this.rDevs.forEach(i=>{(i.type==="light"||t==="away"&&(i.type==="ac"||i.type==="tv"))&&(i.on=!1)}),this.rMusic.linked&&(this.rMusic={...this.rMusic,playing:!1}),this.rFeed={txt:t==="alloff"?"已确认执行「全屋关灯」，所有照明与背景音乐已停止。":"已执行「离家」：全屋灯光、空调与背景音乐已关闭，门锁已上锁。",undone:!1,muted:!1};else if(t==="movie"){if(this.rDevs.forEach(i=>{(i.id==="l_main"||i.id==="l_spot")&&(i.on=!1),i.id==="l_strip"&&(i.on=!0,i.bri=25),i.id==="l_cur"&&(i.on=!1,i.pos=0),i.id==="l_tv"&&(i.on=!0,i.sub="Apple TV · 播放中")}),this.rMusic.linked&&this.rMusic.playing){const i=this.rMusic.zones.map(s=>s.room==="living"?{...s,joined:!1}:s);this.rMusic={...this.rMusic,zones:i}}this.rFeed={txt:"已进入「观影模式」：客厅背景音乐已让位给电视，主灯关闭、灯带 25%。",undone:!1,muted:!1}}else if(t==="sleep"){if(this.rDevs.forEach(i=>{i.type==="light"&&(i.on=i.id==="m_bed"),i.id==="m_bed"&&(i.bri=15),i.id==="m_cur"&&(i.on=!1,i.pos=0),i.id==="m_ac"&&(i.on=!0,i.temp=24,i.mode="睡眠")}),this.rMusic.linked){const i=this.rMusic.zones.map(s=>({...s,joined:s.room==="master",vol:s.room==="master"?18:s.vol}));this.rMusic={...this.rMusic,playlistId:"sleep",trackIdx:0,pos:0,dur:600,playing:!0,sleepMin:30,masterVol:20,zones:i}}this.rFeed={txt:"已进入「睡眠」：主卧切换为助眠雨声（18% 音量，30 分钟后自动停止）。",undone:!1,muted:!1}}else if(t==="night"){const i=this.rDevs.find(s=>s.id==="m_bed");i&&(i.on=!0,i.bri=12),this.rFeed={txt:"已开启「起夜微光」：床头壁灯 12% 暖光。",undone:!1,muted:!1}}else if((t==="r_bright"||t==="r_cozy"||t==="r_off")&&(this.rDevs.filter(i=>i.room===this.activeRoomId).forEach(i=>{t==="r_off"&&i.type!=="lock"&&(i.on=!1),t==="r_bright"&&i.type==="light"&&(i.on=!0,i.bri=85,i.ct=4e3),t==="r_cozy"&&i.type==="light"&&(i.on=!0,i.bri=35,i.ct=2700)}),t==="r_off"&&this.rMusic.linked)){const i=this.rMusic.zones.map(s=>s.room===this.activeRoomId?{...s,joined:!1}:s);this.rMusic={...this.rMusic,zones:i}}e.gatewaySceneId&&this.connectionState==="connected"&&(this._showActionNotice("场景请求已提交，等待设备状态回流确认","info",4e3),this._postGatewayJson(`/api/v1/ai-scenes/${encodeURIComponent(e.gatewaySceneId)}/trigger`,{}).then(()=>{this.rFeed={txt:`已下发场景「${e.name}」：${e.desc}`,undone:!1,muted:!1},this._fetchLiveGatewayData()}).catch(i=>{this._showExecutionFailure(i)})),this.rDevs=[...this.rDevs]}_startHoldConfirm(e,t,i){i.preventDefault();const s=performance.now(),a=900;let n=0;const d=r=>{const h=Math.min(1,(r-s)/a);this.holdProgressMap={...this.holdProgressMap,[e]:Math.round(h*100)},h>=1?(this.holdProgressMap={...this.holdProgressMap,[e]:0},c(),t()):n=requestAnimationFrame(d)},c=()=>{cancelAnimationFrame(n),this.holdProgressMap={...this.holdProgressMap,[e]:0},window.removeEventListener("pointerup",c),window.removeEventListener("pointercancel",c)};window.addEventListener("pointerup",c),window.addEventListener("pointercancel",c),n=requestAnimationFrame(d)}_handleSpeakerTileGesture(e,t){const i=this.rMusic.zones.find(y=>y.room===e);if(!i||!i.online)return;const a=t.currentTarget.getBoundingClientRect(),n=t.clientX;let d=!1,c=!1;const r=window.setTimeout(()=>{d||(c=!0,this.activeRoomId="music")},420),h=y=>{if(Math.abs(y.clientX-n)>8){d=!0,clearTimeout(r);const k=Math.max(5,Math.min(100,Math.round((y.clientX-a.left)/a.width*100)));i.joined=!0,i.vol=k,this.rMusic={...this.rMusic,playing:!0,zones:[...this.rMusic.zones]}}},g=()=>{clearTimeout(r),window.removeEventListener("pointermove",h),window.removeEventListener("pointerup",g),!c&&(d?this._sendMusicCommand(()=>{}):this._sendMusicCommand(y=>{const k=y.zones.find(o=>o.room===e);k&&(k.joined?k.joined=!1:(k.joined=!0,y.playing=!0))}))};window.addEventListener("pointermove",h),window.addEventListener("pointerup",g)}_initVoiceAndWakeEngines(){typeof window>"u"||(this.voicePipeline||(this.voicePipeline=new $e({gatewayBaseUrl:this.gatewayUrlInput||window.location.origin,screenToken:localStorage.getItem("screen_token")||""},{onStageChange:(e,t)=>{this.voiceStage=e,e==="starting"||e==="stt"?this.voiceStageIdx=0:e==="intent"?this.voiceStageIdx=1:e==="tts"||e==="playing"?this.voiceStageIdx=3:e==="error"&&(this.voiceStageIdx=2,t&&(this.voiceReply=t))},onSttResult:e=>{if(e){this.voiceTranscript=`“${e}”`,this.voiceStageIdx=1;const t=this._tryMatchMusicVoiceCommand(e);t&&(this.voiceReply=t,this.voiceReplyText=t)}},onReply:e=>{e&&(this.voiceReply=e,this.voiceReplyText=e,this.voiceStageIdx=3,this.rFeed={txt:`🎙 语音助手：${e}`,undone:!1,muted:!1},this._fetchLiveGatewayData())},onError:e=>{this.voiceModalOpen&&(e.includes("未检测到")||e.includes("不可用")||e.includes("错误")?this._runDemoVoiceSequence():this.voiceReply=e)}})),this._syncWebWakeWordRecognizer())}_syncWebWakeWordRecognizer(){if(typeof window>"u")return;const e=window.SpeechRecognition||window.webkitSpeechRecognition;if(e){if(!this.wakeEnabled){if(this._webSpeechWakeRecognizer){try{this._webSpeechWakeRecognizer.onend=null,this._webSpeechWakeRecognizer.stop()}catch{}this._webSpeechWakeRecognizer=null}return}if(!this._webSpeechWakeRecognizer)try{const t=new e;t.lang="zh-CN",t.continuous=!0,t.interimResults=!0,t.onresult=i=>{var s;if(!(this.voiceModalOpen||!this.wakeEnabled))for(let a=i.resultIndex;a<i.results.length;a++){const n=String(((s=i.results[a][0])==null?void 0:s.transcript)||"").trim(),d=!!i.results[a].isFinal;if(n){if(/小智|小志|小致|小知/.test(n)){this._openVoiceOverlay();return}if(d&&/帮我|请帮我|麻烦帮我/.test(n)){this._executeWebWakeFreeCommand(n);return}}}},t.onend=()=>{this.wakeEnabled&&!this.voiceModalOpen&&this._webSpeechWakeRecognizer===t&&window.setTimeout(()=>{try{t.start()}catch{}},400)},t.start(),this._webSpeechWakeRecognizer=t}catch{}}}_executeWebWakeFreeCommand(e){const t=e.replace(/\s+/g,""),i=this._tryMatchMusicVoiceCommand(t);if(i){this.rFeed={txt:`✓ 免唤醒音乐指令「${t}」：${i}`,undone:!1,muted:!1};return}const s=/关闭|关掉|关上|关/.test(t),a=/打开|开启|开/.test(t);if(!s&&!a)return;const n=this.rDevs.find(d=>{var r;if(d.type==="sensor"||d.offline)return!1;const c=((r=this.rRooms.find(h=>h.id===d.room))==null?void 0:r.name)||"";return t.includes(d.name)||c&&t.includes(c)&&t.includes("灯")&&d.type==="light"});if(n){const d=a&&!s;this._sendDevCommand(n,c=>{c.on=d}),this.rFeed={txt:`✓ 免唤醒快捷指令「${t}」：已${d?"打开":"关闭"}${n.name}`,undone:!1,muted:!1}}else this.rFeed={txt:`🎙 收到免唤醒指令「${t}」，未匹配到唯一受控设备`,undone:!1,muted:!1}}_runDemoVoiceSequence(){this.voiceDemoTimers.forEach(e=>clearTimeout(e)),this.voiceDemoTimers=[window.setTimeout(()=>{this.voiceTranscript="“把客厅灯调到 40%，顺便放点爵士乐”",this.voiceStageIdx=1},650),window.setTimeout(()=>{this.voiceStageIdx=2},1250),window.setTimeout(()=>{const e=this.rDevs.find(t=>t.id==="l_main");if(e&&(e.on=!0,e.bri=40,this.rDevs=[...this.rDevs]),this.rMusic.linked){const t=this.rMusic.zones.map(i=>i.room==="living"?{...i,joined:!0}:i);this.rMusic={...this.rMusic,playlistId:"jazz",playing:!0,zones:t}}this.voiceStageIdx=3,this.voiceReply="✓ 客厅主灯已调到 40%，已为你播放《傍晚爵士 · 暖光》"},1850)]}_renderEnvironmentInsights(){var i,s;const e=this.energyStats,t=((i=this.aiState)==null?void 0:i.frigateEvents)||[];return u`
      <div
        style="display:grid;grid-template-columns:1fr 1fr;gap:14px"
      >
        <div
          class="settings-section"
          aria-live="polite"
          style="padding:18px;border-radius:20px;background:var(--surface);border:1px solid var(--line)"
        >
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <h4 style="margin:0;font-size:14px;font-weight:700;color:var(--text)">
              今日能耗统计 · ${this._formatTodayEnergyKwh(this.energyStats)}
            </h4>
            <span class="pill" style="height:24px;font-size:11px">网关实时回传</span>
          </div>
          <energy-chart .stats="${e}"></energy-chart>
        </div>
        <div
          class="settings-section"
          style="padding:18px;border-radius:20px;background:var(--surface);border:1px solid var(--line)"
        >
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
            <h4 style="margin:0;font-size:14px;font-weight:700;color:var(--text)">关键视觉事件</h4>
            <span class="pill" style="height:24px;font-size:11px">Frigate 边缘视觉</span>
          </div>
          <frigate-events-panel .events="${t}"></frigate-events-panel>
          ${t.length>0&&((s=t[0])!=null&&s.thumbnail)?u`<img src="${t[0].thumbnail}" alt="关键事件截图" style="max-width:100%;border-radius:12px" />`:_}
        </div>
      </div>
    `}_renderGatewaySettingsBlock(){const e=O;return u`
      <div class="tabs" style="width:100%;justify-content:flex-start;margin-bottom:4px">
        ${[{id:"display",label:"☀ 系统与显示"},{id:"voice",label:"🎙 语音与免唤醒"},{id:"gateway",label:"🔗 中控屏配对"},{id:"diagnostics",label:"⚡ 能耗与视觉诊断"}].map(i=>u`
            <button
              class="tab ${this.settingsTab===i.id?"active":""}"
              style="flex:1;justify-content:center"
              @click=${()=>{this.settingsTab=i.id}}
            >
              ${i.label}
            </button>
          `)}
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
        <!-- 系统与显示卡片 -->
        <div
          style="padding:18px;border-radius:20px;background:var(--surface);border:1px solid ${this.settingsTab==="display"?"var(--primary)":"var(--line)"};display:flex;flex-direction:column;gap:12px"
        >
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <div style="font-size:15px;font-weight:800">显示外观与屏幕背光</div>
              <div style="font-size:11px;color:var(--text2)">支持日/夜双主题切换与息屏待机时钟</div>
            </div>
            <span class="pill">${this.themeMode==="dark"?"深色玻璃":"浅色柔光"}</span>
          </div>

          <div
            class="hslider"
            style="height:46px;border-radius:14px"
            @pointerdown=${i=>{const a=i.currentTarget.getBoundingClientRect(),n=r=>{this.screenBriPct=Math.max(10,Math.min(100,Math.round((r.clientX-a.left)/a.width*100)))};n(i);const d=r=>n(r),c=()=>{window.removeEventListener("pointermove",d),window.removeEventListener("pointerup",c)};window.addEventListener("pointermove",d),window.addEventListener("pointerup",c)}}
          >
            <div class="hfill" style="width:${this.screenBriPct}%"></div>
            <div class="hlbl">
              <span>☀ 屏幕背光亮度（左右拖动）</span>
              <span>${this.screenBriPct}%</span>
            </div>
          </div>

          <div class="seg" style="grid-template-columns:1fr 1fr">
            <button
              class="${this.themeMode==="dark"?"on":""}"
              @click=${()=>{this.themeMode="dark",this.removeAttribute("data-theme"),delete document.documentElement.dataset.theme}}
            >
              夜间深邃玻璃
            </button>
            <button
              class="${this.themeMode==="light"?"on":""}"
              @click=${()=>{this.themeMode="light",this.setAttribute("data-theme","light"),document.documentElement.dataset.theme="light"}}
            >
              日间柔白面板
            </button>
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px">
            <span style="font-size:12px;color:var(--text2)">无操作进入息屏：${this.saverTimeoutMin} 分钟</span>
            <button
              class="chip-btn"
              style="height:32px;padding:0 12px"
              @click=${()=>{this.showSettingsDrawer=!1,this.isAmbientMode=!0}}
            >
              立即进入息屏时钟
            </button>
          </div>
        </div>

        <!-- 语音与免唤醒卡片 -->
        <div
          style="padding:18px;border-radius:20px;background:var(--surface);border:1px solid ${this.settingsTab==="voice"?"var(--primary)":"var(--line)"};display:flex;flex-direction:column;gap:12px"
        >
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div>
              <div style="font-size:15px;font-weight:800">语音助手与免唤醒词</div>
              <div style="font-size:11px;color:var(--text2)">唤醒词「小智」· 播报音量与音乐自动避让</div>
            </div>
            <button
              class="tgl ${this.wakeEnabled?"on":""}"
              title="开关免唤醒监听"
              @click=${()=>{this.wakeEnabled=!this.wakeEnabled,this._syncWebWakeWordRecognizer()}}
            ></button>
          </div>

          <div
            class="hslider"
            style="height:46px;border-radius:14px"
            @pointerdown=${i=>{const a=i.currentTarget.getBoundingClientRect(),n=r=>{this.ttsVolPct=Math.max(0,Math.min(100,Math.round((r.clientX-a.left)/a.width*100)))};n(i);const d=r=>n(r),c=()=>{window.removeEventListener("pointermove",d),window.removeEventListener("pointerup",c)};window.addEventListener("pointermove",d),window.addEventListener("pointerup",c)}}
          >
            <div class="hfill" style="width:${this.ttsVolPct}%"></div>
            <div class="hlbl">
              <span>🔊 语音回复与播报音量</span>
              <span>${this.ttsVolPct}%</span>
            </div>
          </div>

          <div class="seg" style="grid-template-columns:repeat(3,1fr)">
            ${["low","mid","high"].map(i=>u`
                <button
                  class="${this.wakeSensitivity===i?"on":""}"
                  @click=${()=>{this.wakeSensitivity=i}}
                >
                  ${i==="low"?"灵敏度 · 低":i==="mid"?"灵敏度 · 标准":"灵敏度 · 高"}
                </button>
              `)}
          </div>

          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px">
            <span style="font-size:12px;color:var(--text2)">
              ${this.musicDuckEnabled?"✓ 唤醒时自动压低背景音乐":"唤醒时不压低背景音乐"}
            </span>
            <button
              class="chip-btn"
              style="height:32px;padding:0 12px"
              @click=${()=>{this.showSettingsDrawer=!1,this._openVoiceOverlay()}}
            >
              测试语音交互
            </button>
          </div>
        </div>
      </div>

      <!-- 网关连接与中控屏配对卡片 -->
      <div
        class="settings-section"
        style="padding:18px;border-radius:20px;background:var(--surface);border:1px solid ${this.settingsTab==="gateway"?"var(--primary)":"var(--line)"};display:flex;flex-direction:column;gap:12px"
      >
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
          <div>
            <h4 style="margin:0;font-size:15px;font-weight:800;color:var(--text)">
              极简设置/诊断 · 家庭网关连接 · ${this.connectionState==="connected"?"已连接":"等待网关配对服务"}
            </h4>
            <div style="font-size:12px;color:var(--text2);margin-top:3px">
              已同步 ${this.rRooms.length} 个房间 · ${this.rDevs.length} 台设备 · ${this.rScenes.length} 个场景
            </div>
          </div>
          <span
            class="pill"
            style="color:${this.connectionState==="connected"?"var(--ok)":"var(--amber)"};border-color:${this.connectionState==="connected"?"rgba(76,215,176,.35)":"rgba(255,181,71,.35)"}"
          >
            ● ${this.connectionState==="connected"?"网关在线 · 受限令牌有效":"等待网关配对服务"}
          </span>
        </div>
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
          <input
            class="settings-input"
            style="flex:1;min-width:220px;margin:0;height:40px;border-radius:12px;padding:0 14px;background:var(--surface2);border:1px solid var(--line);color:var(--text)"
            .value=${this.gatewayUrlInput}
            placeholder="http://192.168.2.147:8234"
            @input=${i=>{this.gatewayUrlInput=i.target.value}}
          />
          <button
            class="chip-btn pri"
            style="height:40px;padding:0 18px;border-radius:12px"
            @click=${()=>{var i,s;this.gatewayUrlInput&&e&&((i=e.setGatewayUrl)==null||i.call(e,this.gatewayUrlInput.trim()),(s=e.connect)==null||s.call(e)),this._fetchLiveGatewayData()}}
          >
            保存并连接网关
          </button>
          <button
            class="chip-btn"
            style="height:40px;padding:0 18px;border-radius:12px"
            @click=${()=>{var i;(i=e==null?void 0:e.refreshDevicesNow)==null||i.call(e),this._fetchLiveGatewayData()}}
          >
            立即同步状态
          </button>
        </div>
      </div>
    `}render(){var k;const e=this.rDevs.filter(o=>o.type==="light"&&o.on).length,t=this.rRooms.filter(o=>o.occ).length,i=this.sheetDevId&&this.rDevs.find(o=>o.id===this.sheetDevId)||null,s=this.rQuestions[this.qIdx]||null,a=this.connectionState==="connected"?"ok":this.connectionState==="connecting"||this.connectionState==="reconnecting"?"warn":"ok",n=(this.connectionState==="connected","网关在线 · 本地 18ms"),d={onSceneClick:o=>this._runScene(o),onSceneHoldPointerDown:(o,l)=>this._startHoldConfirm(o.id,()=>this._runScene(o),l),onJumpRoom:o=>{this.activeRoomId=o},onToggleRoomLights:o=>{const l=this.rDevs.filter(m=>m.room===o&&m.type==="light"),v=l.some(m=>m.on);l.forEach(m=>{m.on=!v}),this.rDevs=[...this.rDevs]},onTilePointerDown:this._handleTilePointerDown,onOpenSheet:o=>{this.sheetDevId=o},onOpenMusic:()=>{this.activeRoomId="music"},onMusicAction:o=>{this._sendMusicCommand(l=>{const v=l.playlists.find(m=>m.id===l.playlistId)||l.playlists[0];o==="toggle"&&(l.playing=!l.playing),o==="next"&&(l.trackIdx=(l.trackIdx+1)%v.tracks.length,l.pos=0,l.dur=v.tracks[l.trackIdx].dur,l.playing=!0),o==="prev"&&(l.trackIdx=(l.trackIdx-1+v.tracks.length)%v.tracks.length,l.pos=0,l.dur=v.tracks[l.trackIdx].dur,l.playing=!0)})}},c=this.rRooms.find(o=>o.id===this.activeRoomId),r=()=>{this.themeMode=this.themeMode==="dark"?"light":"dark",this.themeMode==="light"?(this.setAttribute("data-theme","light"),document.documentElement.dataset.theme="light"):(this.removeAttribute("data-theme"),delete document.documentElement.dataset.theme)},h=()=>{const o=this.rDevs.find(l=>l.id==="l_strip");o&&(o.on=!1),this.rFeed={txt:"已撤销：沙发灯带已恢复关闭。",undone:!0,muted:this.rFeed.muted},this.rDevs=[...this.rDevs]},g=()=>{this.rFeed={txt:"已记录：22:00 后不再自动调亮客厅灯带（可在后台恢复）。",undone:this.rFeed.undone,muted:!0}},y=o=>{o==="yes"&&s&&(this.rFeed={txt:s.eff,undone:!1,muted:!1}),this.qIdx+=1};return u`
      <div class="screen ${this.isMobileLayout?"mobile-mode":""}" id="screen">
        ${this.isMobileLayout?Je({tab:this.mobileTab,stewardSub:this.mobileStewardSub,activityFilter:this.mobileActivityFilter,activeRoomId:this.activeRoomId==="music"?"all":this.activeRoomId,rooms:this.rRooms,devs:this.rDevs,scenes:this.rScenes,music:this.rMusic,greetingText:this.greetingText,netLabel:n,netTone:a,themeMode:this.themeMode,elderMode:this.mobileElderMode,feedTxt:this.rFeed.txt,feedUndone:this.rFeed.undone,feedMuted:this.rFeed.muted,curQ:s,qCounter:`${this.qIdx+1}/${this.rQuestions.length}`,holdProgressMap:this.holdProgressMap,roomRestMap:this.roomRestMap,activityChains:this.mobileActivityChains,inboxItems:this.mobileInboxItems,sceneDrafts:this.mobileSceneDrafts,scenePromptInput:this.mobileScenePromptInput,chatMessages:this.mobileChatMessages,chatInput:this.mobileChatInput},{onSelectTab:o=>{this.mobileTab=o},onSelectStewardSub:o=>{this.mobileStewardSub=o},onSelectActivityFilter:o=>{this.mobileActivityFilter=o},onSelectRoom:o=>{this.activeRoomId=o},onToggleRoomLights:d.onToggleRoomLights,onToggleRoomRest:o=>this._toggleRoomRestMode(o),onSceneClick:d.onSceneClick,onSceneHoldPointerDown:d.onSceneHoldPointerDown,onTilePointerDown:d.onTilePointerDown,onOpenSheet:d.onOpenSheet,onUndoFeed:h,onMuteFeed:g,onAnswerQuestion:y,onResolveInbox:(o,l)=>{this.mobileInboxItems=this.mobileInboxItems.map(v=>v.id===o?{...v,resolved:!0}:v),l&&(this.rFeed={txt:"✓ 已在手机端确认并归档待办事项，策略已同步至家庭网关。",undone:!1,muted:!1})},onScenePromptInput:o=>{this.mobileScenePromptInput=o},onCreateSceneDraft:o=>this._handleCreateMobileSceneDraft(o),onApproveSceneDraft:o=>{const l=this.mobileSceneDrafts.find(v=>v.id===o);if(this.mobileSceneDrafts=this.mobileSceneDrafts.map(v=>v.id===o?{...v,approved:!0}:v),l){const v={id:`sc_${o}`,name:l.name.replace(/^AI 草稿 · /,""),desc:l.actionsSummary,room:"all"};this.rScenes=[v,...this.rScenes],this.rFeed={txt:`✓ 已批准启用新场景「${v.name}」，已同步到全屋与中控屏。`,undone:!1,muted:!1}}},onDeleteSceneDraft:o=>{this.mobileSceneDrafts=this.mobileSceneDrafts.filter(l=>l.id!==o)},onChatInput:o=>{this.mobileChatInput=o},onSendChat:o=>this._handleSendMobileChat(o),onMusicAction:d.onMusicAction,onSelectPlaylist:o=>{this._sendMusicCommand(l=>{l.playlistId=o,l.trackIdx=0,l.pos=0,l.playing=!0})},onToggleMusicZone:o=>{this._sendMusicCommand(l=>{const v=l.zones.find(m=>m.room===o);v&&v.online&&(v.joined=!v.joined)})},onMasterVolChange:o=>{this.rMusic={...this.rMusic,masterVol:o}},onOpenVoice:this._openVoiceOverlay,onToggleTheme:r,onToggleElderMode:()=>{this.mobileElderMode=!this.mobileElderMode},onOpenSettings:()=>{this.showSettingsDrawer=!0},onSwitchToWallPanel:()=>{this._manualLayoutOverride="wall",this.isMobileLayout=!1}}):u`
        ${Oe(this.activeRoomId,this.rRooms,this.rMusic,this.greetingText,n,a,{onSelectRoom:o=>{this.activeRoomId=o},onToggleMusicView:()=>{this.activeRoomId=this.activeRoomId==="music"?"all":"music"},onOpenSettings:()=>{this.showSettingsDrawer=!0},onToggleTheme:r,onOpenSaver:()=>{this.isAmbientMode=!0},onSwitchToMobile:()=>{this._manualLayoutOverride="mobile",this.isMobileLayout=!0}})}

        ${Ve(this.clockText,this.dateText,"晴 19°","湿度 52%","24.3°","49%","优 · 18",e,t,this.rFeed.txt,this.rFeed.undone,this.rFeed.muted,s,`${this.qIdx+1}/${this.rQuestions.length}`,h,g,y,this._openVoiceOverlay)}

        <main class="main" id="main">
          ${this.activeRoomId==="music"?Ee(this.rMusic,{onToggleLink:()=>{this.rMusic={...this.rMusic,linked:!this.rMusic.linked}},onSeekPointerDown:o=>{const v=o.currentTarget.getBoundingClientRect(),m=Math.max(0,Math.min(1,(o.clientX-v.left)/v.width));this._sendMusicCommand($=>{$.pos=Math.round(m*$.dur)})},onControl:o=>{this._sendMusicCommand(l=>{const v=l.playlists.find(m=>m.id===l.playlistId)||l.playlists[0];if(o==="toggle"&&(l.playing=!l.playing),o==="shuffle"&&(l.shuffle=!l.shuffle),o==="timer"){const m=[0,15,30,60];l.sleepMin=m[(m.indexOf(l.sleepMin)+1)%m.length]}if(o==="next"){l.trackIdx=(l.trackIdx+1)%v.tracks.length,l.pos=0;const m=v.tracks[l.trackIdx];l.dur=m.dur,m.streamUrl&&(l.engineMode="open_stream",l.streamUrl=m.streamUrl),l.playing=!0}if(o==="prev"){l.trackIdx=(l.trackIdx-1+v.tracks.length)%v.tracks.length,l.pos=0;const m=v.tracks[l.trackIdx];l.dur=m.dur,m.streamUrl&&(l.engineMode="open_stream",l.streamUrl=m.streamUrl),l.playing=!0}})},onMasterVolPointerDown:o=>{const v=o.currentTarget.getBoundingClientRect(),m=M=>{const R=Math.max(0,Math.min(100,Math.round((M.clientX-v.left)/v.width*100)));this.rMusic={...this.rMusic,masterVol:R}};m(o);const $=M=>m(M),D=()=>{window.removeEventListener("pointermove",$),window.removeEventListener("pointerup",D),this._sendMusicCommand(()=>{})};window.addEventListener("pointermove",$),window.addEventListener("pointerup",D)},onSelectPlaylist:o=>{this._sendMusicCommand(l=>{l.playlistId=o,l.trackIdx=0,l.pos=0;const m=(l.playlists.find($=>$.id===o)||l.playlists[0]).tracks[0];l.dur=m.dur,m.streamUrl?(l.engineMode="open_stream",l.streamUrl=m.streamUrl):l.engineMode==="open_stream"&&o!=="online_search"&&(l.engineMode="local_synth",l.source="中控屏本机扬声器 · 内置环境音源"),l.playing=!0})},onToggleZone:o=>{this._sendMusicCommand(l=>{const v=l.zones.find(m=>m.room===o);v&&v.online&&(v.joined=!v.joined)})},onZoneVolPointerDown:(o,l)=>{const m=l.currentTarget.getBoundingClientRect(),$=R=>{const F=Math.max(0,Math.min(100,Math.round((R.clientX-m.left)/m.width*100))),U=this.rMusic.zones.map(B=>B.room===o?{...B,vol:F}:B);this.rMusic={...this.rMusic,zones:U,masterVol:F}};$(l);const D=R=>$(R),M=()=>{window.removeEventListener("pointermove",D),window.removeEventListener("pointerup",M),this._sendMusicCommand(()=>{})};window.addEventListener("pointermove",D),window.addEventListener("pointerup",M)},onSelectEngineMode:o=>{this._sendMusicCommand(l=>{l.engineMode=o,l.source=o==="local_synth"?"中控屏本机扬声器 · 内置环境音源":o==="ha_media"?`Home Assistant 媒体播放器 · ${l.selectedHaMediaId||"Music Assistant"}`:"开源电台流直连 · Icecast / Navidrome"})},onSelectTrackIdx:o=>{this._sendMusicCommand(l=>{const v=l.playlists.find($=>$.id===l.playlistId)||l.playlists[0];l.trackIdx=o%v.tracks.length,l.pos=0;const m=v.tracks[l.trackIdx];l.dur=m.dur,m.streamUrl&&(l.engineMode="open_stream",l.streamUrl=m.streamUrl),l.playing=!0})},onSelectHaMedia:o=>{this._sendMusicCommand(l=>{l.engineMode="ha_media",l.selectedHaMediaId=o,l.source=`Home Assistant 媒体播放器 · ${o}`})},onUpdateSearchQuery:o=>{this.rMusic={...this.rMusic,searchQuery:o}},onSearchOnlineMusic:o=>{this._searchOnlineMusic(o,!0)}}):this.activeRoomId==="all"||!c?Be(this.rRooms,this.rDevs,this.rScenes,this.rMusic,this.holdProgressMap,d):je(c,this.rRooms,this.rDevs,this.rMusic,this.holdProgressMap,d)}
        </main>
        `}

        ${Le(i,this.rRooms,this.lockHoldPct,{onClose:()=>{this.sheetDevId=null},onLightBriPointerDown:o=>{if(!i)return;const v=o.currentTarget.getBoundingClientRect(),m=M=>{const R=Math.max(5,Math.min(100,Math.round((1-(M.clientY-v.top)/v.height)*100)));i.on=!0,i.bri=R,this.rDevs=[...this.rDevs]};m(o);const $=M=>m(M),D=()=>{window.removeEventListener("pointermove",$),window.removeEventListener("pointerup",D),this._sendDevCommand(i,()=>{})};window.addEventListener("pointermove",$),window.addEventListener("pointerup",D)},onLightCt:o=>{i&&this._sendDevCommand(i,l=>{l.ct=o,l.on=!0})},onLightPower:o=>{i&&this._sendDevCommand(i,l=>{l.on=o})},onAcStep:o=>{i&&this._sendDevCommand(i,l=>{l.on=!0,l.temp=Math.max(16,Math.min(30,(l.temp??25)+o))})},onAcPower:()=>{i&&this._sendDevCommand(i,o=>{o.on=!o.on})},onAcMode:o=>{i&&this._sendDevCommand(i,l=>{l.on=!0,l.mode=o})},onCurtainPosPointerDown:o=>{if(!i)return;const v=o.currentTarget.getBoundingClientRect(),m=M=>{const R=Math.max(0,Math.min(100,Math.round((M.clientX-v.left)/v.width*100)));i.pos=R,i.on=R>0,this.rDevs=[...this.rDevs]};m(o);const $=M=>m(M),D=()=>{window.removeEventListener("pointermove",$),window.removeEventListener("pointerup",D),this._sendDevCommand(i,()=>{})};window.addEventListener("pointermove",$),window.addEventListener("pointerup",D)},onCurtainQuickPos:o=>{i&&this._sendDevCommand(i,l=>{l.pos=o,l.on=o>0})},onLockHoldPointerDown:o=>{if(!i)return;o.preventDefault();const l=performance.now(),v=900;let m=0;const $=M=>{const R=Math.min(1,(M-l)/v);this.lockHoldPct=Math.round(R*100),R>=1?(this.lockHoldPct=0,D(),this._sendDevCommand(i,F=>{F.on=!F.on,F.sub=F.on?"已上锁 · 电量 86%":"已解锁 · 30 秒后自动上锁"})):m=requestAnimationFrame($)},D=()=>{cancelAnimationFrame(m),this.lockHoldPct=0,window.removeEventListener("pointerup",D),window.removeEventListener("pointercancel",D)};window.addEventListener("pointerup",D),window.addEventListener("pointercancel",D),m=requestAnimationFrame($)},onGenericToggle:()=>{i&&this._sendDevCommand(i,o=>{o.on=!o.on})},onRetryRead:()=>{i&&this._sendDevCommand(i,()=>{})}})}

        ${Ue(this.showSettingsDrawer,this._renderGatewaySettingsBlock(),this._renderEnvironmentInsights(),()=>{this.showSettingsDrawer=!1})}

        ${qe(this.voiceModalOpen,this._prevMusicPlaying,this.voiceTranscript,this.voiceStageIdx,this.voiceReply,this._closeVoiceOverlay)}

        ${He(this.isAmbientMode,this.clockText,this.dateText,this.rMusic,"24.3°C",e,()=>{this.isAmbientMode=!1})}

        ${Me(this.actionNotice)}
        ${_e(this.pendingDeviceControlConfirmation,!1,o=>o||"高风险",o=>o,o=>(o==null?void 0:o.service)||"控制操作",()=>{this.pendingDeviceControlConfirmation=null},()=>this._confirmPendingDeviceControl())}
        ${Se((k=this.aiState)==null?void 0:k.criticalEvent,this.gatewayUrlInput||"",()=>{var o,l;return(l=(o=O)==null?void 0:o.dismissCriticalEvent)==null?void 0:l.call(o)})}
        ${Ce(this.activeDetailDevice,()=>{this.activeDetailDevice=null})}
        ${De(this.voiceReplyText)}
      </div>
    `}};f.styles=[Te,Ae].filter(Boolean);x([b()],f.prototype,"activeRoomId",2);x([b()],f.prototype,"themeMode",2);x([b()],f.prototype,"clockText",2);x([b()],f.prototype,"dateText",2);x([b()],f.prototype,"greetingText",2);x([b()],f.prototype,"rRooms",2);x([b()],f.prototype,"rDevs",2);x([b()],f.prototype,"rScenes",2);x([b()],f.prototype,"rMusic",2);x([b()],f.prototype,"rQuestions",2);x([b()],f.prototype,"qIdx",2);x([b()],f.prototype,"rFeed",2);x([b()],f.prototype,"sheetDevId",2);x([b()],f.prototype,"holdProgressMap",2);x([b()],f.prototype,"lockHoldPct",2);x([b()],f.prototype,"voiceModalOpen",2);x([b()],f.prototype,"voiceTranscript",2);x([b()],f.prototype,"voiceStageIdx",2);x([b()],f.prototype,"voiceReply",2);x([b()],f.prototype,"isAmbientMode",2);x([b()],f.prototype,"showSettingsDrawer",2);x([b()],f.prototype,"settingsTab",2);x([b()],f.prototype,"screenBriPct",2);x([b()],f.prototype,"saverTimeoutMin",2);x([b()],f.prototype,"ttsVolPct",2);x([b()],f.prototype,"wakeEnabled",2);x([b()],f.prototype,"wakeSensitivity",2);x([b()],f.prototype,"musicDuckEnabled",2);x([b()],f.prototype,"isMobileLayout",2);x([b()],f.prototype,"mobileTab",2);x([b()],f.prototype,"mobileStewardSub",2);x([b()],f.prototype,"mobileActivityFilter",2);x([b()],f.prototype,"mobileElderMode",2);x([b()],f.prototype,"roomRestMap",2);x([b()],f.prototype,"mobileActivityChains",2);x([b()],f.prototype,"mobileInboxItems",2);x([b()],f.prototype,"mobileSceneDrafts",2);x([b()],f.prototype,"mobileScenePromptInput",2);x([b()],f.prototype,"mobileChatMessages",2);x([b()],f.prototype,"mobileChatInput",2);x([b()],f.prototype,"aiState",2);x([b()],f.prototype,"devices",2);x([b()],f.prototype,"energyStats",2);x([b()],f.prototype,"activeDetailDevice",2);x([b()],f.prototype,"gatewayUrlInput",2);x([b()],f.prototype,"pairingTokenInput",2);x([b()],f.prototype,"pairingBusy",2);x([b()],f.prototype,"pairingHint",2);x([b()],f.prototype,"pairingExpressStatus",2);x([b()],f.prototype,"pairingQrDataUrl",2);x([b()],f.prototype,"connectionState",2);x([b()],f.prototype,"feedStatus",2);x([b()],f.prototype,"voiceStage",2);x([b()],f.prototype,"voiceReplyText",2);x([b()],f.prototype,"wakewordEnabled",2);x([b()],f.prototype,"scenes",2);x([b()],f.prototype,"pendingDeviceControlConfirmation",2);x([b()],f.prototype,"actionNotice",2);f=x([ze("smart-redesign-shell")],f);export{f as SmartRedesignShell};
