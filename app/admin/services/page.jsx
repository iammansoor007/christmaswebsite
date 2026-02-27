// app/admin/services/page.jsx
'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import {
    FaSave, FaPlus, FaTrash, FaArrowUp, FaArrowDown,
    FaImage, FaPalette, FaStar, FaHome, FaBuilding,
    FaSun, FaMoon, FaCloud, FaTree
} from 'react-icons/fa';

export default function ServicesEditor() {
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeService, setActiveService] = useState(0);
    const [uploading, setUploading] = useState(false);

    // Available icons for selection
    const availableIcons = [
        { name: 'FaStar', component: FaStar },
        { name: 'FaHome', component: FaHome },
        { name: 'FaBuilding', component: FaBuilding },
        { name: 'FaSun', component: FaSun },
        { name: 'FaMoon', component: FaMoon },
        { name: 'FaCloud', component: FaCloud },
        { name: 'FaTree', component: FaTree },
    ];

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const { data, error } = await supabase
                .from('content')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(1)
                .single();

            if (error) throw error;
            setContent(data);
        } catch (error) {
            console.error('Error fetching content:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const { error } = await supabase
                .from('content')
                .update({
                    data: content.data,
                    updated_at: new Date().toISOString()
                })
                .eq('id', content.id);

            if (error) throw error;
            alert('✅ Services updated successfully!');
        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            setSaving(false);
        }
    };

    const updateService = (index, field, value) => {
        const newContent = { ...content };
        newContent.data.services.items[index][field] = value;
        setContent(newContent);
    };

    const updateSectionField = (field, value) => {
        const newContent = { ...content };
        newContent.data.services[field] = value;
        setContent(newContent);
    };

    const addService = () => {
        const newContent = { ...content };
        const newService = {
            number: `0${newContent.data.services.items.length + 1}`,
            title: 'New Service',
            description: 'Enter service description here',
            icon: 'FaStar',
            color: '#10B981',
            features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'],
            image: '/images/default.jpg',
            stat: 'New Stat'
        };
        newContent.data.services.items.push(newService);
        setContent(newContent);
        setActiveService(newContent.data.services.items.length - 1);
    };

    const deleteService = (index) => {
        if (confirm('Are you sure you want to delete this service?')) {
            const newContent = { ...content };
            newContent.data.services.items.splice(index, 1);
            // Update numbers
            newContent.data.services.items.forEach((item, idx) => {
                item.number = `0${idx + 1}`;
            });
            setContent(newContent);
            setActiveService(Math.max(0, index - 1));
        }
    };

    const moveService = (index, direction) => {
        const newContent = { ...content };
        const items = newContent.data.services.items;
        if (direction === 'up' && index > 0) {
            [items[index], items[index - 1]] = [items[index - 1], items[index]];
        } else if (direction === 'down' && index < items.length - 1) {
            [items[index], items[index + 1]] = [items[index + 1], items[index]];
        }
        // Update numbers
        items.forEach((item, idx) => {
            item.number = `0${idx + 1}`;
        });
        setContent(newContent);
    };

    const addFeature = (serviceIndex) => {
        const newContent = { ...content };
        newContent.data.services.items[serviceIndex].features.push('New Feature');
        setContent(newContent);
    };

    const updateFeature = (serviceIndex, featureIndex, value) => {
        const newContent = { ...content };
        newContent.data.services.items[serviceIndex].features[featureIndex] = value;
        setContent(newContent);
    };

    const deleteFeature = (serviceIndex, featureIndex) => {
        const newContent = { ...content };
        newContent.data.services.items[serviceIndex].features.splice(featureIndex, 1);
        setContent(newContent);
    };

    const handleImageUpload = async (serviceIndex, file) => {
        if (!file) return;
        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `service-${serviceIndex}-${Date.now()}.${fileExt}`;
            const filePath = `services/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('images')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('images')
                .getPublicUrl(filePath);

            updateService(serviceIndex, 'image', publicUrl);
        } catch (error) {
            alert('Error uploading image: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!content || !content.data || !content.data.services) {
        return (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
                No services data found in your content.
            </div>
        );
    }

    const services = content.data.services;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Services Manager</h1>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
                >
                    <FaSave /> {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {/* Section Settings */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Section Settings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Badge Text
                        </label>
                        <input
                            type="text"
                            value={services.badge || ''}
                            onChange={(e) => updateSectionField('badge', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Premium Services"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Subtitle
                        </label>
                        <input
                            type="text"
                            value={services.subtitle || ''}
                            onChange={(e) => updateSectionField('subtitle', e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="e.g., Transform your property"
                        />
                    </div>
                </div>
            </div>

            {/* Services List */}
            <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Service Cards</h2>
                    <button
                        onClick={addService}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                        <FaPlus /> Add New Service
                    </button>
                </div>

                {/* Service Tabs */}
                {services.items && services.items.length > 0 ? (
                    <>
                        <div className="flex border-b mb-6 overflow-x-auto pb-1">
                            {services.items.map((service, index) => (
                                <button
                                    key={index}
                                    className={`px-4 py-2 whitespace-nowrap font-medium ${activeService === index
                                            ? 'border-b-2 border-blue-600 text-blue-600'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                    onClick={() => setActiveService(index)}
                                >
                                    {service.title || `Service ${index + 1}`}
                                </button>
                            ))}
                        </div>

                        {/* Active Service Editor */}
                        {services.items[activeService] && (
                            <div className="space-y-6">
                                {/* Service Controls */}
                                <div className="flex justify-end gap-2">
                                    <button
                                        onClick={() => moveService(activeService, 'up')}
                                        disabled={activeService === 0}
                                        className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
                                        title="Move Up"
                                    >
                                        <FaArrowUp />
                                    </button>
                                    <button
                                        onClick={() => moveService(activeService, 'down')}
                                        disabled={activeService === services.items.length - 1}
                                        className="p-2 hover:bg-gray-100 rounded disabled:opacity-50"
                                        title="Move Down"
                                    >
                                        <FaArrowDown />
                                    </button>
                                    <button
                                        onClick={() => deleteService(activeService)}
                                        className="p-2 hover:bg-red-100 text-red-600 rounded"
                                        title="Delete Service"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>

                                {/* Basic Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            value={services.items[activeService].title || ''}
                                            onChange={(e) => updateService(activeService, 'title', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Stat (e.g., "500+ Homes")
                                        </label>
                                        <input
                                            type="text"
                                            value={services.items[activeService].stat || ''}
                                            onChange={(e) => updateService(activeService, 'stat', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Description
                                    </label>
                                    <textarea
                                        value={services.items[activeService].description || ''}
                                        onChange={(e) => updateService(activeService, 'description', e.target.value)}
                                        rows="4"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                {/* Icon and Color */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Icon
                                        </label>
                                        <select
                                            value={services.items[activeService].icon || 'FaStar'}
                                            onChange={(e) => updateService(activeService, 'icon', e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
                                        >
                                            {availableIcons.map((icon) => (
                                                <option key={icon.name} value={icon.name}>
                                                    {icon.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Color
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="color"
                                                value={services.items[activeService].color || '#10B981'}
                                                onChange={(e) => updateService(activeService, 'color', e.target.value)}
                                                className="h-10 w-20 border border-gray-300 rounded"
                                            />
                                            <input
                                                type="text"
                                                value={services.items[activeService].color || '#10B981'}
                                                onChange={(e) => updateService(activeService, 'color', e.target.value)}
                                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                                                placeholder="#10B981"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Image */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Image
                                    </label>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={services.items[activeService].image || ''}
                                            onChange={(e) => updateService(activeService, 'image', e.target.value)}
                                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                                            placeholder="/images/service.jpg"
                                        />
                                        <label className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2">
                                            <FaImage />
                                            <span>Upload</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={(e) => handleImageUpload(activeService, e.target.files[0])}
                                                disabled={uploading}
                                            />
                                        </label>
                                    </div>
                                    {services.items[activeService].image && (
                                        <div className="mt-2">
                                            <img
                                                src={services.items[activeService].image}
                                                alt="Preview"
                                                className="h-32 w-32 object-cover rounded-lg border"
                                                onError={(e) => e.target.style.display = 'none'}
                                            />
                                        </div>
                                    )}
                                </div>

                                {/* Features */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Features
                                    </label>
                                    {services.items[activeService].features.map((feature, idx) => (
                                        <div key={idx} className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                value={feature}
                                                onChange={(e) => updateFeature(activeService, idx, e.target.value)}
                                                className="flex-1 border border-gray-300 rounded-lg px-4 py-2"
                                            />
                                            <button
                                                onClick={() => deleteFeature(activeService, idx)}
                                                className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() => addFeature(activeService)}
                                        className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2"
                                    >
                                        <FaPlus /> Add Feature
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        No services yet. Click "Add New Service" to create your first service card.
                    </div>
                )}
            </div>
        </div>
    );
}