import React from "react";

export default function Hero() {
  return (
    <section class="bg-gray-50">
      <div class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen">
        <div class="mx-auto max-w-xl text-center">
          <h1 class="text-3xl font-extrabold sm:text-5xl">
            All Your Digital Products
            <strong class="font-extrabold text-primary sm:block">
              Is One Click Away
            </strong>
          </h1>

          <p class="mt-4 sm:text-xl/relaxed">
            Start exploring State of the art assets now!
          </p>

          <div class="mt-8 flex flex-wrap justify-center gap-4">
            <a
              class="block w-full rounded bg-teal-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-primary focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
              href="#"
            >
              Get Started
            </a>

            <a
              class="block w-full rounded px-12 py-3 text-sm font-medium text-teal-600 shadow hover:text-primary focus:outline-none focus:ring active:text-red-500 sm:w-auto"
              href="#"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
