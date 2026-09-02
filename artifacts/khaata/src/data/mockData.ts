export const MOCK_DATA = {
  businesses: [
    {
      id: 'pg',
      name: 'Sunshine PG',
      type: 'PG',
      address: '14, 3rd Cross, HSR Layout, Bengaluru - 560102',
      phone: '+91 98765 43210',
      gstin: '29ABCDE1234F1Z5',
    },
    {
      id: 'gym',
      name: 'FlexFit Gym',
      type: 'Gym',
      address: 'Shop 5, Koramangala 4th Block, Bengaluru - 560034',
      phone: '+91 90123 45678',
      gstin: '',
    },
    {
      id: 'tiffin',
      name: "Amma's Tiffin",
      type: 'Tiffin',
      address: '22, Jayanagar 9th Block, Bengaluru - 560069',
      phone: '+91 87654 32109',
      gstin: '',
    },
    {
      id: 'yoga',
      name: 'Prana Yoga Studio',
      type: 'Yoga',
      address: '7, Indiranagar 100ft Road, Bengaluru - 560038',
      phone: '+91 91234 56780',
      gstin: '',
    },
  ],
  dashboard: {
    pg: { peopleCount: 12, moneyIn: 62000, moneyOut: 8500, pending: 8000 },
    gym: { peopleCount: 34, moneyIn: 28500, moneyOut: 4200, pending: 0 },
    tiffin: { peopleCount: 18, moneyIn: 21600, moneyOut: 6800, pending: 0 },
    yoga: { peopleCount: 26, moneyIn: 19500, moneyOut: 3100, pending: 1800 }
  },
  people: {
    pg: [
      { id: 'p1', name: 'Rahul Sharma', role: 'Room 101', status: 'Active', due: 0, date: '12 Oct' },
      { id: 'p2', name: 'Amit Singh', role: 'Room 102', status: 'Overdue', due: 8000, date: '5 Oct' },
      { id: 'p3', name: 'Neha Gupta', role: 'Room 103', status: 'New', due: 0, date: '1 Nov' },
    ],
    gym: [
      { id: 'g1', name: 'Vikas Kumar', role: 'Monthly Plan', status: 'Active', due: 0, date: '15 Oct' },
      { id: 'g2', name: 'Priya Desai', role: 'Quarterly Plan', status: 'Expiring', due: 0, date: '18 Oct' },
      { id: 'g3', name: 'Sanjay Patel', role: 'Annual Plan', status: 'Overdue', due: 11000, date: '1 Oct' },
    ],
    tiffin: [
      { id: 't1', name: 'Rohan Mehra', role: 'Lunch & Dinner', status: 'Active', due: 0, date: '10 Oct' },
      { id: 't2', name: 'Anjali Verma', role: 'All Meals', status: 'Pending', due: 1500, date: '25 Oct' },
    ],
    yoga: [
      { id: 'y1', name: 'Kavita Rao', role: 'Beginner Yoga · 6 AM', status: 'Active', due: 0, date: '10 Oct' },
      { id: 'y2', name: 'Arjun Nair', role: 'Advanced Yoga · 7 PM', status: 'Overdue', due: 1800, date: '3 Oct' },
      { id: 'y3', name: 'Meera Iyer', role: 'Kids Yoga · 5 PM', status: 'New', due: 0, date: '2 Nov' },
    ]
  },
  transactions: [
    { id: 'tr1', person: 'Rahul Sharma', business: 'pg', desc: 'Rent Oct', date: '12 Oct', amount: 8000, type: 'in' },
    { id: 'tr2', person: 'Electricity Bill', business: 'pg', desc: 'Bill Oct', date: '15 Oct', amount: 2500, type: 'out' },
    { id: 'tr3', person: 'Vikas Kumar', business: 'gym', desc: 'Monthly Fee', date: '15 Oct', amount: 1200, type: 'in' },
    { id: 'tr4', person: 'Kavita Rao', business: 'yoga', desc: 'Beginner Yoga · Monthly', date: '10 Oct', amount: 1800, type: 'in' },
  ],
  staff: [
    { id: 's1', name: 'Suresh Kumar', role: 'Welder', payType: 'Monthly salary', payAmount: 22000 },
    { id: 's2', name: 'Mahesh', role: 'Helper', payType: 'Daily wage', payAmount: 600 },
    { id: 's3', name: 'Lakshmi', role: 'Accounts', payType: 'Monthly salary', payAmount: 18000 },
    { id: 's4', name: 'Ravi', role: 'Delivery', payType: 'Daily wage', payAmount: 550 },
  ],
  // Schedule + Fee setup, shared architecture for schedule-based businesses (Gym, Yoga)
  businessSetup: {
    gym: {
      accessType: 'hybrid' as 'open' | 'batch' | 'hybrid',
      operatingHours: [
        { days: 'Mon–Sat', from: '06:00', to: '22:00' },
        { days: 'Sun', from: '07:00', to: '13:00' },
      ],
      roomsEnabled: false,
      rooms: [] as string[],
      batches: [
        {
          id: 'b1',
          name: 'Zumba Blast',
          days: ['Mon', 'Wed', 'Fri'],
          time: '06:00 AM',
          capacity: 20,
          instructor: 'Priya Desai',
          mode: 'Offline' as 'Offline' | 'Online' | 'Hybrid',
          meetingLink: '',
          room: '',
        },
        {
          id: 'b2',
          name: 'Personal Training',
          days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
          time: '05:00 PM',
          capacity: 1,
          instructor: 'Suresh Kumar',
          mode: 'Offline' as 'Offline' | 'Online' | 'Hybrid',
          meetingLink: '',
          room: '',
        },
      ],
      feePlans: [
        {
          id: 'fp1',
          name: 'General Gym Access',
          batchIds: [] as string[],
          cycles: [
            { label: 'Monthly', price: 1200 },
            { label: 'Quarterly', price: 3200 },
            { label: 'Annual', price: 11000 },
          ],
        },
        {
          id: 'fp2',
          name: 'Personal Training',
          batchIds: ['b2'],
          cycles: [
            { label: 'Monthly', price: 4500 },
            { label: 'Quarterly', price: 12000 },
          ],
        },
      ],
      trialSession: { enabled: true, price: 0 },
      addOns: [
        { id: 'a1', name: 'Locker', price: 300 },
        { id: 'a2', name: 'Diet Consultation', price: 800 },
      ],
    },
    yoga: {
      accessType: 'batch' as 'open' | 'batch' | 'hybrid',
      operatingHours: [
        { days: 'Mon–Sat', from: '05:30', to: '20:00' },
      ],
      roomsEnabled: true,
      rooms: ['Studio A', 'Studio B'],
      batches: [
        {
          id: 'yb1',
          name: 'Beginner Yoga',
          days: ['Mon', 'Wed', 'Fri'],
          time: '06:00 AM',
          capacity: 15,
          instructor: 'Lakshmi',
          mode: 'Hybrid' as 'Offline' | 'Online' | 'Hybrid',
          meetingLink: 'https://meet.google.com/prana-beginner',
          room: 'Studio A',
        },
        {
          id: 'yb2',
          name: 'Advanced Yoga',
          days: ['Tue', 'Thu', 'Sat'],
          time: '07:00 PM',
          capacity: 12,
          instructor: 'Ravi',
          mode: 'Offline' as 'Offline' | 'Online' | 'Hybrid',
          meetingLink: '',
          room: 'Studio B',
        },
        {
          id: 'yb3',
          name: 'Kids Yoga',
          days: ['Sat', 'Sun'],
          time: '05:00 PM',
          capacity: 10,
          instructor: 'Lakshmi',
          mode: 'Offline' as 'Offline' | 'Online' | 'Hybrid',
          meetingLink: '',
          room: 'Studio A',
        },
      ],
      feePlans: [
        {
          id: 'yfp1',
          name: 'Beginner Yoga',
          batchIds: ['yb1'],
          cycles: [
            { label: 'Monthly', price: 1800 },
            { label: 'Quarterly', price: 4800 },
            { label: 'Half-Yearly', price: 8500 },
          ],
        },
        {
          id: 'yfp2',
          name: 'Advanced Yoga',
          batchIds: ['yb2'],
          cycles: [
            { label: 'Monthly', price: 2200 },
            { label: 'Quarterly', price: 6000 },
          ],
        },
        {
          id: 'yfp3',
          name: 'Kids Yoga',
          batchIds: ['yb3'],
          cycles: [
            { label: 'Monthly', price: 1200 },
            { label: 'Quarterly', price: 3200 },
          ],
        },
      ],
      trialSession: { enabled: true, price: 0 },
      addOns: [
        { id: 'ya1', name: 'Yoga Mat Rental', price: 150 },
      ],
    },
  },
};