import { Text } from 'react-native';

export default function ErrorMessage({ message }: { message?: string }) {
  if (!message) return null;
  return <Text className="text-red-500 text-sm mt-1">{message}</Text>;
}