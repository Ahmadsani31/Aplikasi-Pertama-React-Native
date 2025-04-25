import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import Input from '../../components/Input';
import SafeAreaView from '../../components/SafeAreaView';
import { Feather } from '@expo/vector-icons';

import { useFormik } from 'formik';
import * as yup from 'yup';

import { toast } from '@backpackapp-io/react-native-toast';

const validationSchema = yup.object().shape({
    username: yup.string().required('Username harus diisi'),
    password: yup.string().min(6, 'Minimal 6 karakter').required('Password harus diisi'),
});

export default function LoginScreen({ navigation }: any) {

    const { login, isLoading } = useAuth();

    const [showPassword, setShowPassword] = useState(true);

    const formik = useFormik({
        initialValues: { username: '', password: '' },
        validationSchema,
        onSubmit: async (values) => {
            const username = values.username;
            const password = values.password;
          await login({ username, password });
            toast.error('Wow. That Sucked!');
        },
    });

    return (
        <SafeAreaView className='flex-1 p-3 justify-center'>
            <View className='items-center mb-10'>
                <Image
                    className='w-32 h-32'
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png',
                    }}
                />
            </View>

            <View className=" bg-white p-5 rounded-lg">
                <Text className="text-3xl mt-5 text-center font-bold text-gray-800 mb-8">System Log-In</Text>

                {formik.errors.username && formik.touched.password && (
                    <View className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-5">
                        <Text className='font-bold'>Warning!</Text>
                        <Text className='block sm:inline'>Silakan lengkapi data terlebih dahulu.</Text>
                    </View>
                )}

                <Input
                    label="Username"
                    placeholder="Enter your username"
                    value={formik.values.username}
                    onChangeText={formik.handleChange('username')}
                    error={formik.touched.username ? formik.errors.username : undefined}
                    className='bg-gray-200'
                />

                <View className='relative'>
                    <Input
                        label="Password"
                        placeholder="Enter your password"
                        value={formik.values.password}
                        onChangeText={formik.handleChange('password')}
                        secureTextEntry={showPassword}
                        error={formik.touched.password ? formik.errors.password : undefined}
                        className='bg-gray-200'
                    />
                    <TouchableOpacity className='absolute top-10 right-3' onPress={() => setShowPassword(!showPassword)}>
                        {showPassword ? <Feather name='eye-off' size={26} /> : <Feather name='eye' size={26} />}
                    </TouchableOpacity>
                </View>

                <Button
                    title="Login"
                    onPress={formik.handleSubmit}
                    loading={isLoading}
                    variant="primary"
                />
                <View className="flex-row justify-center mt-4 mb-5">
                    <Text className="text-gray-600">Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text className="text-blue-500 font-medium">Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}