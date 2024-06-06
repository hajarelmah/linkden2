import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-react';

const Register = () => {
    const { data, setData, post, processing, errors } = useForm({
        full_name: '',
        user_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        gender: '',
        bio: '',
        date_of_birth: '',
        pfp: '',
        role: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('register'));
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Full Name</label>
                <input
                    type="text"
                    value={data.full_name}
                    onChange={e => setData('full_name', e.target.value)}
                />
                {errors.full_name && <div>{errors.full_name}</div>}
            </div>
            <div>
                <label>Username</label>
                <input
                    type="text"
                    value={data.user_name}
                    onChange={e => setData('user_name', e.target.value)}
                />
                {errors.user_name && <div>{errors.user_name}</div>}
            </div>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                />
                {errors.email && <div>{errors.email}</div>}
            </div>
            <div>
                <label>Password</label>
                <input
                    type="password"
                    value={data.password}
                    onChange={e => setData('password', e.target.value)}
                />
                {errors.password && <div>{errors.password}</div>}
            </div>
            <div>
                <label>Confirm Password</label>
                <input
                    type="password"
                    value={data.password_confirmation}
                    onChange={e => setData('password_confirmation', e.target.value)}
                />
                {errors.password_confirmation && <div>{errors.password_confirmation}</div>}
            </div>
            <div>
                <label>Gender</label>
                <input
                    type="text"
                    value={data.gender}
                    onChange={e => setData('gender', e.target.value)}
                />
                {errors.gender && <div>{errors.gender}</div>}
            </div>
            <div>
                <label>Bio</label>
                <input
                    type="text"
                    value={data.bio}
                    onChange={e => setData('bio', e.target.value)}
                />
                {errors.bio && <div>{errors.bio}</div>}
            </div>
            <div>
                <label>Date of Birth</label>
                <input
                    type="date"
                    value={data.date_of_birth}
                    onChange={e => setData('date_of_birth', e.target.value)}
                />
                {errors.date_of_birth && <div>{errors.date_of_birth}</div>}
            </div>
            <div>
                <label>Profile Picture URL</label>
                <input
                    type="text"
                    value={data.pfp}
                    onChange={e => setData('pfp', e.target.value)}
                />
                {errors.pfp && <div>{errors.pfp}</div>}
            </div>
            <div>
                <label>Role</label>
                <input
                    type="text"
                    value={data.role}
                    onChange={e => setData('role', e.target.value)}
                />
                {errors.role && <div>{errors.role}</div>}
            </div>
            <button type="submit" disabled={processing}>Register</button>
        </form>
    );
};

export default Register;
