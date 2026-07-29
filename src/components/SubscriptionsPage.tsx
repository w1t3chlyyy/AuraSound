import { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { subscriptionPlans } from '../data';

export default function SubscriptionsPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <div className="relative z-10 h-full overflow-y-auto bg-black pt-20 pb-28 px-4 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="animate-fade-up delay-1 text-center mb-10">
          <h2 className="text-3xl sm:text-4xl text-white mb-3">
            Выберите свой план
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Слушайте музыку так, как вам удобно. Отмена в любой момент.
          </p>
        </div>

        {/* Billing toggle */}
        <div className="animate-fade-up delay-2 flex justify-center mb-10">
          <div className="liquid-glass rounded-xl p-1 flex gap-1">
            <button
              onClick={() => setBilling('monthly')}
              className={`rounded-lg px-5 py-2 text-sm transition-all duration-200 ${
                billing === 'monthly'
                  ? 'bg-white text-gray-900'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Ежемесячно
            </button>
            <button
              onClick={() => setBilling('yearly')}
              className={`rounded-lg px-5 py-2 text-sm transition-all duration-200 flex items-center gap-1.5 ${
                billing === 'yearly'
                  ? 'bg-white text-gray-900'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              Ежегодно
              <span className="text-[10px] bg-blue-700 text-white px-1.5 py-0.5 rounded-full">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {subscriptionPlans.map((plan, i) => {
            const isSelected = selectedPlan === plan.id;
            const yearlyPrice = plan.id === 'plus' ? '1 912 ₽' : plan.id === 'family' ? '3 352 ₽' : '0 ₽';
            const displayPrice = billing === 'yearly' && plan.id !== 'free' ? yearlyPrice : plan.price;

            return (
              <div
                key={plan.id}
                className={`animate-fade-up relative rounded-2xl p-6 transition-all duration-300 cursor-pointer ${
                  plan.popular
                    ? 'bg-gradient-to-b from-blue-900/30 to-black/60 border border-blue-700/30'
                    : 'bg-white/[0.03] border border-white/[0.06]'
                } ${isSelected ? 'ring-2 ring-blue-600 scale-[1.02]' : 'hover:bg-white/[0.05]'}`}
                style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-blue-700 px-3 py-1 text-[11px] font-medium text-white">
                    <Sparkles size={12} />
                    Популярный
                  </div>
                )}

                <h3 className="text-lg font-medium text-white mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-5">
                  <span className="text-3xl font-semibold text-white">{displayPrice}</span>
                  <span className="text-sm text-white/40">{billing === 'yearly' && plan.id !== 'free' ? '/ год' : plan.period}</span>
                </div>

                <ul className="space-y-3">
                  {plan.features.map((feature, fi) => (
                    <li key={fi} className="flex items-start gap-2.5 text-sm text-white/70">
                      <Check size={16} className="mt-0.5 shrink-0 text-blue-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-6 w-full rounded-xl py-2.5 text-sm font-medium transition-all duration-200 ${
                    isSelected
                      ? 'bg-blue-700 text-white hover:bg-blue-600'
                      : plan.popular
                      ? 'bg-white text-gray-900 hover:bg-white/90'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {isSelected ? 'Выбрано' : 'Выбрать'}
                </button>
              </div>
            );
          })}
        </div>

        <p className="animate-fade-up delay-5 text-center text-white/30 text-xs mt-8">
          Оплата безопасна. Подписка автоматически продлевается. Отмена в любой момент.
        </p>
      </div>
    </div>
  );
}
