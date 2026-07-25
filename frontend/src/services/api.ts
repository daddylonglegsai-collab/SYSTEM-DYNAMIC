const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export interface AdvisorResponse {
  success: boolean;
  analysis: string;
}

export interface SimulationResponse {
  success: boolean;
  simulation: string;
}

export interface SimulationRequest {
  scenario: string;
  intensity: number;
}

export const apiService = {
  async askAdvisor(context: string): Promise<AdvisorResponse> {
    try {
      const response = await fetch(`${API_BASE}/advisor`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ context })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Advisor API error:', error);
      throw error;
    }
  },

  async runSimulation(data: SimulationRequest): Promise<SimulationResponse> {
    try {
      const response = await fetch(`${API_BASE}/simulation`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Simulation API error:', error);
      throw error;
    }
  }
};
