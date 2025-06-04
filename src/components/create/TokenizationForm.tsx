import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Info, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

const tokenizationSchema = z.object({
  initialSupply: z.number()
    .min(100, 'Minimum supply is 100 tokens')
    .max(1000000, 'Maximum supply is 1,000,000 tokens'),
  tokenPrice: z.number()
    .min(0.0001, 'Minimum price is 0.0001 ETH')
    .max(1000, 'Maximum price is 1000 ETH'),
  tradingFee: z.number()
    .min(0, 'Trading fee cannot be negative')
    .max(10, 'Maximum trading fee is 10%'),
  creatorRoyalty: z.number()
    .min(0, 'Royalty cannot be negative')
    .max(15, 'Maximum royalty is 15%'),
  vestingPeriod: z.number()
    .min(0, 'Vesting period cannot be negative')
    .max(365, 'Maximum vesting period is 365 days'),
});

type TokenizationFormData = z.infer<typeof tokenizationSchema>;

interface TokenizationFormProps {
  onSubmit: (data: TokenizationFormData) => void;
  isProcessing?: boolean;
}

const TokenizationForm: React.FC<TokenizationFormProps> = ({ onSubmit, isProcessing }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<TokenizationFormData>({
    resolver: zodResolver(tokenizationSchema),
    defaultValues: {
      initialSupply: 1000,
      tokenPrice: 0.001,
      tradingFee: 2,
      creatorRoyalty: 5,
      vestingPeriod: 30,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block font-bold mb-2">
            Initial Supply
            <span className="ml-2 text-sm font-normal text-text/60">
              (Total number of tokens to create)
            </span>
          </label>
          <input
            type="number"
            step="100"
            {...register('initialSupply', { valueAsNumber: true })}
            className={`input ${errors.initialSupply ? 'border-error' : ''}`}
          />
          {errors.initialSupply && (
            <p className="text-sm text-error mt-1">{errors.initialSupply.message}</p>
          )}
        </div>

        <div>
          <label className="block font-bold mb-2">
            Token Price (ETH)
            <span className="ml-2 text-sm font-normal text-text/60">
              (Initial price per token)
            </span>
          </label>
          <input
            type="number"
            step="0.0001"
            {...register('tokenPrice', { valueAsNumber: true })}
            className={`input ${errors.tokenPrice ? 'border-error' : ''}`}
          />
          {errors.tokenPrice && (
            <p className="text-sm text-error mt-1">{errors.tokenPrice.message}</p>
          )}
        </div>

        <div>
          <label className="block font-bold mb-2">
            Trading Fee (%)
            <span className="ml-2 text-sm font-normal text-text/60">
              (Fee per trade)
            </span>
          </label>
          <input
            type="number"
            step="0.1"
            {...register('tradingFee', { valueAsNumber: true })}
            className={`input ${errors.tradingFee ? 'border-error' : ''}`}
          />
          {errors.tradingFee && (
            <p className="text-sm text-error mt-1">{errors.tradingFee.message}</p>
          )}
        </div>

        <div>
          <label className="block font-bold mb-2">
            Creator Royalty (%)
            <span className="ml-2 text-sm font-normal text-text/60">
              (Your earnings from trades)
            </span>
          </label>
          <input
            type="number"
            step="0.1"
            {...register('creatorRoyalty', { valueAsNumber: true })}
            className={`input ${errors.creatorRoyalty ? 'border-error' : ''}`}
          />
          {errors.creatorRoyalty && (
            <p className="text-sm text-error mt-1">{errors.creatorRoyalty.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block font-bold mb-2">
            Vesting Period (Days)
            <span className="ml-2 text-sm font-normal text-text/60">
              (Lock period for initial tokens)
            </span>
          </label>
          <input
            type="number"
            {...register('vestingPeriod', { valueAsNumber: true })}
            className={`input ${errors.vestingPeriod ? 'border-error' : ''}`}
          />
          {errors.vestingPeriod && (
            <p className="text-sm text-error mt-1">{errors.vestingPeriod.message}</p>
          )}
        </div>
      </div>

      <div className="bg-primary-light rounded-xl p-4 border-2 border-text">
        <div className="flex items-start gap-3">
          <Info size={20} className="mt-1" />
          <div>
            <h4 className="font-bold">Token Economics</h4>
            <p className="text-sm mt-1">
              Your content will be tokenized with the following distribution:
              <br />• 70% for public trading
              <br />• 20% creator allocation (vested)
              <br />• 10% platform reserve
            </p>
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        className="w-full btn btn-primary text-text"
        disabled={isProcessing}
      >
        {isProcessing ? (
          <span className="flex items-center justify-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader size={20} />
            </motion.div>
            Launching...
          </span>
        ) : (
          'Review & Launch'
        )}
      </button>
    </form>
  );
};

export default TokenizationForm;
