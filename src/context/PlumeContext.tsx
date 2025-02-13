'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface CycleData {
  cycleNumber: number;
  totalStaked: number;
  expectedRewards: number;
  networkRevenue: number;  // Fixed at 10 pUSD
  pusdStreamed: number;    // Renamed from actualRevenue
  surplus: number;
  plumeEmissions: number;
}

interface PlumeContextType {
  availableBalance: number;
  stakedAmount: number;
  currentCycleRewards: number;
  totalStreamingRewards: number;
  claimedRewards: number;
  streamedAmount: number;
  cycleNumber: number;
  nextCycleIn: string;
  stake: (amount: number) => void;
  unstake: (amount: number) => void;
  claimRewards: () => void;
  cycleData: CycleData;
  historicalCycles: CycleData[];
  plumePrice: number;
  weeklyAPY: number;
  cycleEndTime: number;
  fastForwardTime: (targetTimeLeft: number) => void;
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
  
  // Cycle timing (7 days)
  const CYCLE_DURATION = 7 * 24 * 60 * 60; // 7 days in seconds
  const [cycleNumber, setCycleNumber] = useState(1);
  const [nextCycleIn, setNextCycleIn] = useState('7:00:00:00'); // d:hh:mm:ss
  
  // Make cycleEndTime accessible to components
  const [cycleEndTime, setCycleEndTime] = useState(() => {
    const now = Math.floor(Date.now() / 1000);
    return now + CYCLE_DURATION;
  });

  // APY calculations (not in percentage terms)
  const ANNUAL_APY = 5; // 5%
  const weeklyAPY = ANNUAL_APY / 52; // ~0.0961538... (5/52)
  const [plumePrice, setPlumePrice] = useState(0.12); // pUSD per PLUME
  const [carryOverPusd, setCarryOverPusd] = useState(0);
  
  // Fixed network revenue per cycle
  const FIXED_NETWORK_REVENUE = 10; // pUSD
  
  // Track cycle data
  const [cycleData, setCycleData] = useState<CycleData>({
    cycleNumber: 1,
    totalStaked: 0,
    expectedRewards: 12,
    networkRevenue: FIXED_NETWORK_REVENUE,
    pusdStreamed: 0,
    surplus: 0,
    plumeEmissions: 0
  });
  
  const [historicalCycles, setHistoricalCycles] = useState<CycleData[]>([]);

  // Calculate rewards per second based on weekly APY
  const calculateRewardsPerSecond = (staked: number) => {
    // Weekly reward = staked × price × weeklyAPY
    // For 100 PLUME: 100 × 0.12 × (5/52) = 1.1538461538 pUSD per week
    const weeklyRewards = staked * plumePrice * weeklyAPY;
    return weeklyRewards / (7 * 24 * 60 * 60);
  };

  // Fast forward function
  const fastForwardTime = (targetTimeLeft: number) => {
    const now = Math.floor(Date.now() / 1000);
    const newEndTime = now + targetTimeLeft;
    
    // Calculate rewards for the fast-forwarded period
    const timeSkipped = cycleEndTime - newEndTime;
    if (timeSkipped > 0 && stakedAmount > 0) {
      const rewardsPerSecond = calculateRewardsPerSecond(stakedAmount);
      setCurrentCycleRewards(prev => prev + (rewardsPerSecond * timeSkipped));
    }
    
    setCycleEndTime(newEndTime);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Math.floor(Date.now() / 1000);
      const timeLeft = cycleEndTime - now;
      
      if (timeLeft >= 0) {
        // Update countdown timer with days
        const days = Math.floor(timeLeft / (24 * 60 * 60));
        const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
        const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
        const seconds = timeLeft % 60;
        setNextCycleIn(
          `${days}:${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
        
        // Accumulate rewards for current cycle
        if (stakedAmount > 0) {
          const rewardsPerSecond = calculateRewardsPerSecond(stakedAmount);
          setCurrentCycleRewards(prev => prev + rewardsPerSecond);
        }
      } else {
        // Handle cycle transition with fixed network revenue
        const actualRevenue = FIXED_NETWORK_REVENUE + carryOverPusd;
        const expectedRewards = stakedAmount * plumePrice * weeklyAPY;
        
        let surplus = actualRevenue - expectedRewards;
        let plumeEmissions = 0;
        
        if (surplus < 0) {
          plumeEmissions = Math.abs(surplus) / plumePrice;
          surplus = 0;
        }
        
        // First update cycle number
        const nextCycleNumber = cycleNumber + 1;
        setCycleNumber(nextCycleNumber);
        
        // Store current cycle data in history before creating new cycle data
        setHistoricalCycles(prev => [...prev, {
          ...cycleData,
          cycleNumber: cycleNumber // Store with current cycle number
        }]);
        
        // Create new cycle data with the next cycle number
        const newCycleData = {
          cycleNumber: nextCycleNumber,
          totalStaked: stakedAmount,
          expectedRewards,
          networkRevenue: FIXED_NETWORK_REVENUE,
          pusdStreamed: currentCycleRewards,
          surplus,
          plumeEmissions
        };
        
        setCycleData(newCycleData);
        setCarryOverPusd(surplus);
        
        // Handle rewards transition
        if (currentCycleRewards > 0) {
          setTotalStreamingRewards(currentCycleRewards);
          setCurrentCycleRewards(0);
          setClaimedRewards(0);
          setStreamedAmount(0);
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
  }, [cycleEndTime, currentCycleRewards, totalStreamingRewards, claimedRewards, stakedAmount, carryOverPusd, plumePrice, cycleNumber, cycleData]);

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
        cycleNumber,
        nextCycleIn,
        stake,
        unstake,
        claimRewards,
        cycleData,
        historicalCycles,
        plumePrice,
        weeklyAPY,
        cycleEndTime,
        fastForwardTime
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