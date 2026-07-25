export const manifest = {
  screens: {
    scr_04rrsx: { name: "Executive dashboard", route: "/", state: { "page": "dashboard" }, position: { "x": 752.47, "y": -244.55 }, width: 2576, height: 1498 },
    scr_fv8nr7: { name: "Projects", route: "/", state: { "page": "projects" }, position: { "x": 84.75, "y": 1852.25 } },
    scr_nkv0lp: { name: "Human resources", route: "/", state: { "page": "people" }, position: { "x": 4360, "y": 1820 } },
    scr_mwyfrc: { name: "Warehouse", route: "/", state: { "page": "warehouse" }, position: { "x": 2960, "y": 1820 } },
    scr_jjdqmo: { name: "Procurement", route: "/", state: { "page": "procurement" }, position: { "x": 1560, "y": 1820 } },
    scr_gonbqe: { name: "Factory digital twin", route: "/", state: { "page": "factory" }, position: { "x": 160, "y": 3800 } },
    scr_a3u0o7: { name: "AI Advisor", route: "/", state: { "page": "advisor" }, position: { "x": 160, "y": 5780 } },
    scr_dh1sg2: { name: "Simulation center", route: "/", state: { "page": "simulation" }, position: { "x": 1560, "y": 3800 } },
    scr_r0ywt5: { name: "Reports", route: "/", state: { "page": "reports" }, position: { "x": 1560, "y": 5780 } }
  },
  sections: {
    sec_v17a6c: { name: "Core Operations", x: 0, y: 1600, width: 5720, height: 1180 },
    sec_nd1jpi: { name: "Manufacturing & Simulation", x: 0, y: 3580, width: 2920, height: 1180 },
    sec_v5zvmu: { name: "Intelligence & Reporting", x: 0, y: 5560, width: 2920, height: 1180 }
  },
  layers: [
  { kind: "screen", id: "scr_04rrsx" },
  { kind: "section", id: "sec_v17a6c", children: [
    { kind: "screen", id: "scr_fv8nr7" },
    { kind: "screen", id: "scr_jjdqmo" },
    { kind: "screen", id: "scr_mwyfrc" },
    { kind: "screen", id: "scr_nkv0lp" }]
  },
  { kind: "section", id: "sec_nd1jpi", children: [
    { kind: "screen", id: "scr_gonbqe" },
    { kind: "screen", id: "scr_dh1sg2" }]
  },
  { kind: "section", id: "sec_v5zvmu", children: [
    { kind: "screen", id: "scr_a3u0o7" },
    { kind: "screen", id: "scr_r0ywt5" }]
  }]

};