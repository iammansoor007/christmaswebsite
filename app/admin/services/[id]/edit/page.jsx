'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import AdminShell from '../../../components/AdminShell';
import toast from 'react-hot-toast';

const ICON_OPTIONS = ['FaHome', 'FaStar', 'FaBuilding', 'FaTree', 'FaLightbulb', 'FaTools', 'FaShieldAlt', 'FaCheckCircle', 'FaBolt'];
const COLOR_OPTIONS = ['#E63946', '#F4A261', '#2A9D8F', '#1D3557', '#10B981', '#3B82F6', '#F59E0B', '#8B5CF6'];

export default function EditServicePage() {
    const router = useRouter();
    const { id } = useParams();
    const fileRef = useRef();
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [loading, setLoading] = useState(true);
    const [features, setFeatures] = useState(['']);
    const [imagePreview, setImagePreview] = useState('');
    const [form, setForm] = useState({
        title: '', slug: '', description: '',
        icon: 'FaStar', image: '', color: '#E63946',
        number: '01', stat: '', status: 'active', order: 0,
    });

    const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

    useEffect(() => {
        fetch(`/api/services/${id}`)
            .then(r => r.json())
            .then(d => {
                if (d.service) {
                    const s = d.service;
                    setForm({
                        title: s.title, slug: s.slug, description: s.description || '',
                        icon: s.icon || 'FaStar', image: s.image || '', color: s.color || '#E63946',
                        number: s.number || '01', stat: s.stat || '', status: s.status, order: s.order || 0,
                    });
                    setFeatures(s.features?.length ? s.features : ['']);
                    setImagePreview(s.image || '');
                }
            })
            .catch(() => toast.error('Failed to load service'))
            .finally(() => setLoading(false));
    }, [id]);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        setImagePreview(URL.createObjectURL(file));
        try {
            const fd = new FormData();
            fd.append('file', file);
            const res = await fetch('/api/upload', { method: 'POST', body: fd });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            set('image', data.path);
            toast.success('Image uploaded');
        } catch (err) {
            toast.error(err.message);
        } finally {
            setUploading(false);
        }
    };

    const addFeature = () => setFeatures(f => [...f, '']);
    const updateFeature = (i, v) => setFeatures(f => f.map((x, j) => j === i ? v : x));
    const removeFeature = (i) => setFeatures(f => f.filter((_, j) => j !== i));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const payload = { ...form, features: features.filter(f => f.trim()) };
            const res = await fetch(`/api/services/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            toast.success('Service updated!');
            router.push('/admin/services');
        } catch (err) {
            toast.error(err.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <AdminShell>
            <div className="flex items-center justify-center h-64">
                <div className="text-gray-500 text-sm">Loading service...</div>
            </div>
        </AdminShell>
    );

    return (
        <AdminShell>
            <div className="max-w-3xl mx-auto space-y-6">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="text-gray-500 hover:text-white transition-colors">← Back</button>
                    <h1 className="text-2xl font-bold text-white">Edit Service</h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 space-y-5">
                        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Basic Info</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Title *</label>
                                <input type="text" required value={form.title} onChange={e => set('title', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Slug</label>
                                <input type="text" value={form.slug} onChange={e => set('slug', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-amber-400 font-mono focus:outline-none focus:border-amber-500 text-sm" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1.5">Description *</label>
                            <textarea required value={form.description} onChange={e => set('description', e.target.value)} rows={4}
                                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-sm resize-none" />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Number</label>
                                <input type="text" value={form.number} onChange={e => set('number', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Stat Label</label>
                                <input type="text" value={form.stat} onChange={e => set('stat', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-sm" placeholder="500+ Homes" />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Status</label>
                                <select value={form.status} onChange={e => set('status', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-sm">
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 space-y-5">
                        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Appearance</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Icon Name</label>
                                <select value={form.icon} onChange={e => set('icon', e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-sm">
                                    {ICON_OPTIONS.map(i => <option key={i} value={i}>{i}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-1.5">Accent Color</label>
                                <div className="flex gap-2 flex-wrap pt-1">
                                    {COLOR_OPTIONS.map(c => (
                                        <button key={c} type="button" onClick={() => set('color', c)}
                                            className={`w-7 h-7 rounded-lg transition-all ${form.color === c ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-900 scale-110' : ''}`}
                                            style={{ backgroundColor: c }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-1.5">Service Image</label>
                            <div className="flex gap-4 items-start">
                                {imagePreview && (
                                    <img src={imagePreview} alt="Preview" className="w-24 h-24 rounded-xl object-cover border border-gray-700" />
                                )}
                                <div className="flex-1">
                                    <input type="file" ref={fileRef} accept="image/*" onChange={handleUpload} className="hidden" />
                                    <button type="button" onClick={() => fileRef.current.click()} disabled={uploading}
                                        className="px-4 py-2.5 bg-gray-800 border border-dashed border-gray-600 hover:border-amber-500 text-gray-400 hover:text-white rounded-xl text-sm transition-all w-full disabled:opacity-50">
                                        {uploading ? '⏳ Uploading...' : '📁 Change Image'}
                                    </button>
                                    {form.image && <p className="text-xs text-emerald-400 mt-1.5">✓ {form.image}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Features</h2>
                            <button type="button" onClick={addFeature} className="text-xs text-amber-400 hover:text-amber-300 transition-colors">+ Add Feature</button>
                        </div>
                        {features.map((f, i) => (
                            <div key={i} className="flex gap-2">
                                <input type="text" value={f} onChange={e => updateFeature(i, e.target.value)} placeholder={`Feature ${i + 1}`}
                                    className="flex-1 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-sm" />
                                {features.length > 1 && (
                                    <button type="button" onClick={() => removeFeature(i)} className="px-3 text-red-400 hover:bg-red-950/40 rounded-xl transition-colors text-sm">✕</button>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-3 justify-end">
                        <button type="button" onClick={() => router.back()} className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl text-sm transition-all">Cancel</button>
                        <button type="submit" disabled={saving}
                            className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-semibold rounded-xl text-sm transition-all disabled:opacity-50 shadow-lg shadow-red-500/20">
                            {saving ? '⏳ Saving...' : '✓ Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </AdminShell>
    );
}
