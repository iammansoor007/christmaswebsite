// app/services/supabaseService.js
import { supabase } from '@/lib/supabase-client';
import {
    FaStar, FaHome, FaShieldAlt, FaHeart, FaCalendarCheck, FaPhoneAlt,
    FaArrowRight, FaCheckCircle, FaQuoteRight, FaCalendarAlt, FaCouch,
    FaChair, FaQuestionCircle, FaDollarSign, FaClock, FaLightbulb,
    FaBuilding, FaTree, FaSnowflake, FaChevronDown
} from 'react-icons/fa';
import { GiSparkles } from 'react-icons/gi';

const iconMap = {
    FaStar, FaHome, FaShieldAlt, FaHeart, FaCalendarCheck, FaPhoneAlt,
    FaArrowRight, FaCheckCircle, FaQuoteRight, FaCalendarAlt, FaCouch,
    FaChair, FaQuestionCircle, FaDollarSign, FaClock, FaLightbulb,
    FaBuilding, FaTree, FaSnowflake, FaChevronDown,
    GiSparkles
};

export const getIconComponent = (iconName) => {
    return iconMap[iconName] || FaCheckCircle;
};

export async function getServicesData() {
    try {
        const { data, error } = await supabase
            .from('content')
            .select('data')
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (error) throw error;
        if (!data) return null;

        return data.data.services;
    } catch (error) {
        console.error('Error fetching services:', error);
        return null;
    }
}