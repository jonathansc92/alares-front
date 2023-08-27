"use client";
import React, { useEffect, useState } from "react";
import PlanComponent from './components/PlanComponent';

const Page = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch("/api/plans", {
        headers: {
          "Content-Type": "application/json"
        }
      });
      const result = await response.json();

      setPlans(result.data);
    }

    getData();

  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section>
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold">
              Planos
            </h2>
          </div>
          <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
            {
              plans?.map((plan, index) => {
                return (
                  <>
                    <div key={index}>
                      <PlanComponent
                        planId={plan.id}
                        speed={plan.speed}
                        unit={plan.giga == 'sim' ? "Giga(s)" : "Mega(s)"}
                        price={plan.price}
                        wifi={plan.wifi}
                        games={plan.games}
                        movies={plan.movies}
                        best={plan.best}
                      />
                    </div>
                  </>
                )
              })
            }
          </div>
        </div>
      </section>
    </main>
  )
}

export default Page;
