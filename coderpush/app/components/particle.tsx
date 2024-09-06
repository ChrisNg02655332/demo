"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { loadSlim } from "@tsparticles/slim";
import { IOptions, RecursivePartial } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";

const options: RecursivePartial<IOptions> = {
  particles: {
    reduceDuplicates: true,
    number: {
      value: 20,
    },
    color: {
      value: '#80C926',
    },
    links: {
      enable: true,
      distance: 100,
    },
    shape: {
      type: 'circle',
    },
    opacity: {
      value: 0.5,
    },
    size: {
      value: {
        min: 2,
        max: 4,
      },
    },
    move: {
      enable: true,
      speed: 0.2,
    },
  },
  fullScreen: {
    enable: false,
    zIndex: -1
  },
  background: {
    color: '#192232',
  },
  style: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
};


export default function Particle({ children }: PropsWithChildren) {
  const [init, setInit] = useState(false)
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true))
  }, [])

  return <>{init ? (
    <Particles
      options={options}
    // url="api/particles"
    />
  ) : null}</>
}
