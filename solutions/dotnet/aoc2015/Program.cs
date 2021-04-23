using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Mail;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Security.Cryptography;
using System.Text;
using System.Text.RegularExpressions;

namespace csharp
{
    internal static class Extensions
    {
        public static bool IsVowel(this char c)
        {
            return "aeiou".IndexOf(c.ToString(), StringComparison.OrdinalIgnoreCase) >= 0;
        }
    }

    public interface IWire
    {
        short Value { get; set; }
    }
    
    internal interface IGate
    {
        void AddInput(IWire wire);
        void OutputWire(IWire wire);

        short ProcessInputs();
    }

    class Wire : IWire
    {
        public short Value { get; set; }
    }

    public abstract class Gate : IGate
    {
        protected List<IWire> wires = new List<IWire>();
        protected IWire outputWire = null;
        
        public void AddInput(IWire wire)
        {
            this.wires.Add(wire);
        }

        public void OutputWire(IWire wire)
        {
            outputWire = wire;
        }

        public abstract short ProcessInputs();
    }
    
    public class ANDGate: Gate
    {
        public override short ProcessInputs()
        {
            return (short) (wires[0].Value & wires[1].Value);
        }
    }
    public class ORGate: Gate
    {
        public override short ProcessInputs()
        {
            return (short) (wires[0].Value | wires[1].Value);
        }
    }
    public class NOTGate: Gate
    {
        public override short ProcessInputs()
        {
            return (short) ~(wires[0].Value);
        }
    }

    public abstract class BitShiftGate : Gate
    {
        protected int x = 0;

        protected BitShiftGate(int x)
        {
            this.x = x;
        }
    }
    public class RSHIFTGate: BitShiftGate
    {
        public override short ProcessInputs()
        {
            return ((short) (wires[0].Value >> this.x));
        }

        public RSHIFTGate(int x) : base(x)
        {
        }
    }
    public class LSHIFTGate: BitShiftGate
    {
        public override short ProcessInputs()
        {
            return ((short) (wires[0].Value << this.x));
        }

        public LSHIFTGate(int x) : base(x)
        {
        }
    }


    class Program
    {
        static void Main(string[] args)
        {
            // Day1();
            // Day2();
            // Day3();
            // Day4();
            // Day5();
            Day6();
            // Day7();
        }

        static void Day6()
        {
            var inputLines = File.ReadLines(@"C:\git\hub\advent-of-code\2015\instructions\DAY-6-1-INPUT.txt");
            bool[,] lights = new bool[1000,1000];
            int[,] brightness = new int[1000,1000];
            
            var r = new Regex(@"(.*) (\d*),(\d*) through (\d*),(\d*)");
            foreach (string line in inputLines)
            {
                var mc = r.Match(line);
                var action = mc.Groups[1].Value;
                int topX = int.Parse(mc.Groups[2].Value);
                int topY = int.Parse(mc.Groups[3].Value);
                int bottomX = int.Parse(mc.Groups[4].Value);
                int bottomY = int.Parse(mc.Groups[5].Value);

                for (int x = topX; x <= bottomX; x++)
                {
                    for (int y = topY; y <= bottomY; y++)
                    {
                        switch (action)
                        {
                            case "turn on":
                                lights[x, y] = true;
                                brightness[x, y] += 1;
                                break;
                            case "toggle":
                                lights[x, y] = !lights[x, y];
                                brightness[x, y] += 2;
                                break;
                            case "turn off":
                                lights[x, y] = false;
                                brightness[x, y] = Math.Max(brightness[x, y] - 1, 0);
                                break;
                            default:
                                throw new Exception($"Derp action: {action}");
                        }
                    }
                }

            }
            
            int lightsOn = 0;
            int totalBrightness = 0;
            foreach (var light in lights)
            {
                lightsOn += light ? 1 : 0;
            }

            foreach (var b in brightness)
            {
                totalBrightness += b;
            }
                
            Console.Out.WriteLine($"Lights on: {lightsOn}");
            Console.Out.WriteLine($"Toal brightness: {totalBrightness}");
            
            // Part 2
        }

        static void Day5()
        {
            
            var inputLines = File.ReadLines(@"C:\git\hub\advent-of-code\2015\instructions\DAY-5-1-INPUT.txt");
            int niceList = 0;

            foreach (string line in inputLines)
            {
                // Three vowels.
                if (line.ToLower().ToCharArray().Count(x => x.IsVowel()) < 3)
                {
                    continue;
                }
                
                // Repeated chars
                char? previous = null;
                bool ruleBroken = false;
                bool pairFound = false;
                for (int i = 0; i < line.Length; i++)
                {
                    if (previous.HasValue && previous.Value == line.ToCharArray()[i])
                    {
                        pairFound = true;
                    }

                    previous = line.ToCharArray()[i];

                    // ab, cd, pq, or xy
                    HashSet<string> troublesome = new HashSet<string>{"ab", "cd", "pq", "xy"};
                    if (i > 0 && troublesome.Contains(line.Substring(i-1, 2)))
                    {
                        ruleBroken = true;           
                        break;

                    }
                }

                if (ruleBroken || !pairFound)
                {
                    continue;
                }

                niceList++;
            }
            Console.Out.WriteLine($"Nice list: {niceList}");
            
            // Part 2
            int niceCount = 0;

            foreach (string line in inputLines)
            {
                bool condition1 = false;
                bool condition2 = false;

                char[] charArray = line.ToCharArray();
                
                for (int x = 0; x < line.Length; x++)
                {
                    for (int y = x+2; y < line.Length - 1; y++)
                    {
                        condition1 = condition1 || (line.Substring(x, 2) == line.Substring(y, 2));
                    }
                    condition2 = condition2 || (line.Length - x > 2 && charArray[x] == charArray[x + 2]);
                }
                if (condition1 && condition2)
                {
                    niceCount++;
                }
            }
            Console.Out.WriteLine($"New nice list: {niceCount}");
        }

        static void Day4()
        {
            string prefix = "iwrupvqb";
            static int prefixFinder(string hashPrefix, string targetOutPrefix, int startAt=0)
            {
                using (MD5 md5 = MD5.Create())
                {
                    int i = startAt;
                    string o = "";
                    while (string.Concat(o.Take(targetOutPrefix.Length)) != targetOutPrefix)
                    {
                        var hish = md5.ComputeHash(new UTF8Encoding().GetBytes(hashPrefix + i.ToString()));
                        o = string.Concat(hish.Select(b => b.ToString("X2")).ToArray());
                        i++;
                    }
                    Console.Out.WriteLine($"Oh... {i - 1}.");
                    return i;
                }
            }

            int ans = prefixFinder(prefix, "00000");
            prefixFinder(prefix, "000000", startAt: ans);

        }

        static void Day3()
        {
            static Tuple<int, int> getDirection(char direction)
            {
                switch (direction)
                {
                    case '<':
                        return new Tuple<int, int>(-1, 0);
                    case '>':
                        return new Tuple<int, int>(1, 0);
                    case '^':
                        return new Tuple<int, int>(0, 1);
                    case 'v':
                        return new Tuple<int, int>(0, -1);
                }

                throw new ArgumentException("Not recognised direction.");
            }

            HashSet<Tuple<int, int>> visits = new HashSet<Tuple<int, int>>();
            string input_ = File.ReadAllText(@"C:\git\hub\advent-of-code\2015\instructions\DAY-3-1-INPUT.txt");
            var currentLocation = new Tuple<int, int>(0, 0);
            foreach (var direction in input_)
            {
                var movement = getDirection(direction);

                currentLocation = new Tuple<int, int>(currentLocation.Item1 + movement.Item1,
                    currentLocation.Item2 + movement.Item2);
                visits.Add(currentLocation);
            }

            Console.Out.WriteLine($"Total houses visited: {visits.Count + 1}");

            // Part 2
            var delivererVisits = new HashSet<Tuple<int, int>>[]
            {
                new HashSet<Tuple<int, int>>(), new HashSet<Tuple<int, int>>()
            };

            var delivererPositions = new Tuple<int, int>[] {new Tuple<int, int>(0, 0), new Tuple<int, int>(0, 0)};

            for (int index = 0; index < input_.Length; index++)
            {
                int deliverer = index % 2;
                char d = input_.ToCharArray()[index];
                var movement = getDirection(d);
                delivererPositions[deliverer] = new Tuple<int, int>(delivererPositions[deliverer].Item1 + movement.Item1,
                    delivererPositions[deliverer].Item2 + movement.Item2);
                delivererVisits[deliverer].Add(delivererPositions[deliverer]);
            }

            var uniqueVisits = new HashSet<Tuple<int, int>>() {new Tuple<int, int>(0, 0)};
            foreach (var delivererVisit in delivererVisits)
            {
                foreach (var visit in delivererVisit)
                {
                    uniqueVisits.Add(visit);
                }
            }
            Console.Out.WriteLine($"Total houses visited by two deliverers: {uniqueVisits.Count}");

        }

        static void Day2()
        {
            int wrappingPaperAreaRequired = 0;
            int ribbonLengthRequired = 0;
            string input_ = null;
            var inputLines = File.ReadLines(@"C:\git\hub\advent-of-code\2015\instructions\DAY-2-1-INPUT.txt");

            foreach (var line in inputLines)
            {
                var dims = line.Split("x").Select(int.Parse).ToArray();
                var sideAreas = new int[] {dims[0] * dims[1], dims[1] * dims[2], dims[0] * dims[2]};

                wrappingPaperAreaRequired += sideAreas.Sum(x => x * 2) + sideAreas.Min();
                ribbonLengthRequired += dims.OrderBy(x => x).Take(2).Sum() * 2 + dims[0] * dims[1] * dims[2];
            }
            
            Console.Out.WriteLine($"Wrapping paper area required: {wrappingPaperAreaRequired}");
            Console.Out.WriteLine($"Ribbon length required: {ribbonLengthRequired}");
        }
        
        static void Day1()
        {
            string input_;
            using (StreamReader sr = new StreamReader(@"C:\git\hub\advent-of-code\2015\instructions\DAY-1-1-INPUT.txt"))
            {
                input_ = sr.ReadToEnd();
            }

            Console.Out.WriteLine(input_);
            int floor = input_.ToCharArray().Sum(character => (character == '(' ? 1 : -1));

            Console.Out.WriteLine(floor);

            floor = 0;
            int index = 0;
            while (floor >= 0)
            {
                floor += (input_[index] == '(' ? 1 : -1);
                index++;
            }
            
            Console.Out.WriteLine(index); 
        }
    }
}