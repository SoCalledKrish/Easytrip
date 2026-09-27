"use client";

import { useMemo, useState } from "react";

type CostEstimate = {
  id: string;
  budget_type: string;
  daily_total: number;
};

type TripCostCalculatorProps = {
  estimates: CostEstimate[];
  cityName: string;
  defaultDays?: number;
};

export default function TripCostCalculator({
  estimates,
  cityName,
  defaultDays = 2,
}: TripCostCalculatorProps) {
  const [days, setDays] = useState(defaultDays);
  const [selectedBudget, setSelectedBudget] = useState(
    estimates[1]?.budget_type ?? estimates[0]?.budget_type ?? ""
  );

  const selectedEstimate = estimates.find(
    (estimate) => estimate.budget_type === selectedBudget
  );

  const totalCost = useMemo(() => {
    if (!selectedEstimate) {
      return 0;
    }

    return selectedEstimate.daily_total * days;
  }, [selectedEstimate, days]);

  if (estimates.length === 0) {
    return null;
  }

  return (
    <section className="trip-cost-calculator">
      <div className="section-heading city-next-section">
        <div>
          <span className="section-label">PLAN YOUR BUDGET</span>

          <h2>How much might your trip cost?</h2>
        </div>

        <p>
          Adjust your trip length and travel style to get a rough
          estimate for {cityName}.
        </p>
      </div>

      <div className="glass-panel trip-cost-calculator-panel">
        <div className="trip-cost-controls">
          <div className="trip-cost-control">
            <label htmlFor="trip-days">
              Number of days
            </label>

            <div className="days-control">
              <button
                type="button"
                onClick={() =>
                  setDays((current) => Math.max(1, current - 1))
                }
                aria-label="Decrease number of days"
              >
                −
              </button>

              <span>{days}</span>

              <button
                type="button"
                onClick={() =>
                  setDays((current) => Math.min(30, current + 1))
                }
                aria-label="Increase number of days"
              >
                +
              </button>
            </div>
          </div>

          <div className="trip-cost-control">
            <label htmlFor="budget-style">
              Travel style
            </label>

            <select
              id="budget-style"
              value={selectedBudget}
              onChange={(event) =>
                setSelectedBudget(event.target.value)
              }
            >
              {estimates.map((estimate) => (
                <option
                  key={estimate.id}
                  value={estimate.budget_type}
                >
                  {estimate.budget_type}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="trip-cost-result">
          <span className="section-label">
            ESTIMATED TRIP COST
          </span>

          <div className="trip-cost-total">
            <span>₹</span>
            {totalCost.toLocaleString("en-IN")}
          </div>

          <p>
            Approximately ₹
            {selectedEstimate?.daily_total.toLocaleString("en-IN") ?? "0"}
            {" "}per day × {days}{" "}
            {days === 1 ? "day" : "days"}.
          </p>
        </div>
      </div>
    </section>
  );
}