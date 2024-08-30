import React from 'react';

const TypographyExample: React.FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-5xl font-bold">Heading 1</h1>
      <h2 className="text-4xl font-semibold">Heading 2</h2>
      <h3 className="text-3xl font-medium">Heading 3</h3>
      <h4 className="text-2xl font-medium">Heading 4</h4>
      <h5 className="text-xl font-medium">Heading 5</h5>
      <h6 className="text-lg font-medium">Heading 6</h6>
      <p className="text-base">Regular paragraph text</p>
      <p className="text-sm">Small text</p>
      <p className="text-xs">Extra small text</p>
    </div>
  );
};

export default TypographyExample;