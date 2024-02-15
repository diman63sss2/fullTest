import { useEffect, useRef, useState } from 'react';

interface TestComponentProps {
  className?: string;
}

const useHook = () => {
    console.log('hook');
    useEffect(() => {
        console.log('hook useEffect');
    }, []);
};

type dataType = {
  value: number
  increment: () => void,
}

export const TestComponent = ({ className }: TestComponentProps) => (
    <div>

        <div />
    </div>
);
