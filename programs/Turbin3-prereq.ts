import { Idl } from '@coral-xyz/anchor';

export const IDL: Idl = {
    address: 'your_program_address',
    metadata: {
        name: "wba_prereq",
        version: "0.1.0",
        spec: "0.1.0",
        description: "Created with Anchor",
    },
    instructions: [
        // instruction properties
    ],
    version: "0.1.0",
    name: "Turbin3-prereq",
};

// Creating type and object
export type Turbin3Prereq = {
    version: "0.1.0";
    name: "Turbin3-prereq";
};
  