import { jsx } from '@emotion/react';
import React from 'react'

interface ItemProps {
    id: number;
    header: string;
    solution: object;
}

function calculateDomain(a: number, b: number, c: number) {
    let delta = b ^ 2 - 4 * a * c;
    if (delta < 0) return [null];
    if (delta === 0) return [-b / 2 * a, null]
    if (delta > 0) return [(-b - Math.sqrt(delta)) / 2 * a, (-b + Math.sqrt(delta)) / 2 * a]
}

export default function SolutionItem(item: ItemProps) {

    return (
        <div>

        </div>
    )
}
