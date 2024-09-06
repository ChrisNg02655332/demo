import { IOptions, RecursivePartial } from '@tsparticles/engine';
import type { NextApiRequest, NextApiResponse } from 'next';

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
      distance: 70,
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
    zIndex: -1,
  },
  background: {
    color: '#192232',
  },
  style: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
};

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.status(200).json(options);
}
