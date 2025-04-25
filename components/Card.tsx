import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '', ...props }: CardProps) {
  return (
    <View
      className={`bg-white rounded-lg shadow-sm border border-gray-100 ${className}`}
      {...props}
    >
      {children}
    </View>
  );
}