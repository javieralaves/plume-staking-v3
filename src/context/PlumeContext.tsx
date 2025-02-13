'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface PlumeContextType {
  availableBalance: number;
  stakedAmount: number;
  currentCycleRewards: number;
  totalStreamingRewards: number;
  claimedRewards: number;
  streamedAmount: number;
  rewardsPerSecond: number;
  cycleNumber: number;
  nextCycleIn: string;
  stake: (amount: number) => void;
  unstake: (amount: number) => void;
  claimRewards: () => void;
}

const PlumeContext = createContext<PlumeContextType | undefined>(undefined);

export function PlumeProvider({ children }: { children: ReactNode }) {
  const [availableBalance, setAvailableBalance] = useState(1000);
  const [stakedAmount, setStakedAmount] = useState(0);
  
  // Reward states
  const [currentCycleRewards, setCurrentCycleRewards] = useState(0);
  const [totalStreamingRewards, setTotalStreamingRewards] = useState(0);
  const [claimedRewards, setClaimedRewards] = useState(0);
  const [streamedAmount, setStreamedAmount] = useState(0);
  
  // Cycle timing (5 minutes)
  const CYCLE_DURATION = 5 * 60;
  const [cycleNumber, setCycleNumber] = useState(1);
  const [nextCycleIn, setNextCycleIn] = useState('5:00');
  
  // Calculate initial cycle end time
  const [cycleEndTime, setCycleEndTime] = useState(() => {
    const now = Math.floor(Date.now() / 1000);
    return now + CYCLE_DURATION;
  });

  // Mock reward rate: 0.0001 pUSD per PLUME staked per second
  const rewardsPerSecond = stakedAmount * 0.0001;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const timeLeft = cycleEndTime - now;
      
      if (timeLeft >= 0) {
        // Update countdown timer
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        setNextCycleIn(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        
        // Accumulate rewards for current cycle
        if (stakedAmount > 0) {
          setCurrentCycleRewards(prev => prev + rewardsPerSecond);
        }
      } else {
        // Handle cycle transition
        if (currentCycleRewards > 0) {
          // Lock current rewards and move to streaming
          setTotalStreamingRewards(currentCycleRewards);
          setCurrentCycleRewards(0);
          setClaimedRewards(0);
          setStreamedAmount(0);
          setCycleNumber(prev => prev + 1);
          console.log('New reward cycle started!');
        }
        
        // Start new cycle
        setCycleEndTime(now + CYCLE_DURATION);
      }
      
      // Calculate streaming progress
      if (totalStreamingRewards > 0) {
        const cycleStart = cycleEndTime - CYCLE_DURATION;
        const elapsed = now - cycleStart;
        const streamProgress = Math.min(elapsed / CYCLE_DURATION, 1);
        const newStreamedAmount = (totalStreamingRewards * streamProgress) - claimedRewards;
        setStreamedAmount(Math.max(0, newStreamedAmount));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [cycleEndTime, currentCycleRewards, totalStreamingRewards, claimedRewards, stakedAmount, rewardsPerSecond]);

  const stake = (amount: number) => {
    if (amount <= availableBalance) {
      setStakedAmount(prev => prev + amount);
      setAvailableBalance(prev => prev - amount);
    }
  };

  const unstake = (amount: number) => {
    if (amount <= stakedAmount) {
      setStakedAmount(prev => prev - amount);
      setAvailableBalance(prev => prev + amount);
    }
  };

  const claimRewards = () => {
    if (streamedAmount > 0) {
      setClaimedRewards(prev => prev + streamedAmount);
      setStreamedAmount(0);
    }
  };

  return (
    <PlumeContext.Provider 
      value={{ 
        availableBalance, 
        stakedAmount,
        currentCycleRewards,
        totalStreamingRewards,
        claimedRewards,
        streamedAmount,
        rewardsPerSecond,
        cycleNumber,
        nextCycleIn,
        stake,
        unstake,
        claimRewards 
      }}
    >
      {children}
    </PlumeContext.Provider>
  );
}

export function usePlume() {
  const context = useContext(PlumeContext);
  if (context === undefined) {
    throw new Error('usePlume must be used within a PlumeProvider');
  }
  return context;
} 