﻿using System;
using Set.Utils;
using Xunit;
using Xunit.Extensions;

namespace Set.Tests
{
    public class SetTests
    {
        [Fact]
        public void Add_SimpleValues_AddedSuccessful()
        {
            var set = new Set<int>();
            var expectedSet = new Set<int>(new[] { 1, 2 });
            set.Add(1);
            set.Add(2);
            set.Add(2);
            Assert.Equal(expectedSet, set);
        }

        [Fact]
        public void Set_NullValue_ArgumentNullExceptionThrown()
        {
            Assert.Throws(typeof(ArgumentNullException), () =>
            {
                int[] collection = null;
                var set = new Set<int>(collection);
            });
        }

        [Fact]
        public void Set_CollectionWithoutItems_SizeOfSetShouldBeZero()
        {
            var set = new Set<int>(new int[0]);
            int actual = set.Count;
            Assert.Equal(0, actual);
        }

        [Fact]
        public void Set_NegativeValue_ArgumentOutOfRangeExceptionThrown()
        {
            Assert.Throws(typeof(ArgumentOutOfRangeException), () =>
            {
                var set = new Set<int>(-5);
            });
        }

        [Fact]
        public void Set_DublicateValues_CorrectSet()
        {
            var set = new Set<int>(new[] { 1, 3, 5, 5, 7, 7, 3, 1 });
            var expectedSet = new Set<int>(new[] { 1, 3, 5, 7 });
            Assert.Equal(expectedSet, set);
        }

        [Fact]
        public void Clear_NoParams_ClearedSuccessful()
        {
            var set = new Set<int>(new[] { 0, 2, 4 });
            set.Clear();
            Assert.Equal(0, set.Count);
        }

        [Theory]
        [InlineData(5, true)]
        [InlineData(4, false)]
        public void Contains_DataDrivenValues_AllShouldPass(int element, bool expected)
        {
            var set = new Set<int>(new[] { 1, 3, 5, 7, 9 });
            bool actual = set.Contains(element);
            Assert.Equal(expected, actual);
        }

        [Theory]
        [InlineData(5, new[] { 1, 3, 7, 9 })]
        [InlineData(1, new[] { 3, 5, 7, 9 })]
        [InlineData(9, new[] { 1, 3, 5, 7 })]
        public void Remove_DataDrivenValues_AllShouldPass(int element, int[] expected)
        {
            var set = new Set<int>(new[] { 1, 3, 5, 7, 9 });
            var expectedSet = new Set<int>(expected);
            set.Remove(element);
            Assert.Equal(expectedSet, set);
        }

        [Theory]
        [InlineData(new int[0], new[] { 1, 3 }, new[] { 1, 3 })]
        [InlineData(new[] { 1, 3, 5, 7 }, new[] { 5, 9, 3, 11, 7, 1 }, new[] { 1, 3, 5, 7, 9, 11 })]
        [InlineData(new[] { 1, 3 }, new[] { 5, 9 }, new[] { 1, 3, 5, 9 })]
        public void UnionWith_OtherSet_AllShouldPass(int[] firstArray, int[] secondArray, int[] expected)
        {
            var firstSet = new Set<int>(firstArray);
            var secondSet = new Set<int>(secondArray);
            var expectedSet = new Set<int>(expected);
            firstSet.UnionWith(secondSet);
            Assert.Equal(expectedSet, firstSet);
        }

        [Theory]
        [InlineData(new int[0], new[] { 1, 3 }, new int[0])]
        [InlineData(new[] { 1, 3, 5, 7 }, new int[0], new int[0])]
        [InlineData(new[] { 1, 3, 5, 7, 9 }, new[] { 11, 7, 13, 3, 9, 15 }, new[] { 3, 7, 9 })]
        public void IntersectWith_OtherSet_AllShouldPass(int[] firstArray, int[] secondArray, int[] expected)
        {
            var firstSet = new Set<int>(firstArray);
            var secondSet = new Set<int>(secondArray);
            var expectedSet = new Set<int>(expected);
            firstSet.IntersectWith(secondSet);
            Assert.Equal(expectedSet, firstSet);
        }


        [Theory]
        [InlineData(new int[0], new[] { 1, 3 }, new int[0])]
        [InlineData(new[] { 1, 3, 5, 7 }, new int[0], new[] { 1, 3, 5, 7 })]
        [InlineData(new[] { 1, 3, 5, 7, 9 }, new[] { 11, 7, 13, 3, 9, 15 }, new[] { 1, 5 })]
        public void ExceptWith_OtherSet_AllShouldPass(int[] firstArray, int[] secondArray, int[] expected)
        {
            var firstSet = new Set<int>(firstArray);
            var secondSet = new Set<int>(secondArray);
            var expectedSet = new Set<int>(expected);
            firstSet.ExceptWith(secondSet);
            Assert.Equal(expectedSet, firstSet);
        }

        [Fact]
        public void ExceptWith_Self_ShouldPass()
        {
            var set = new Set<int>(new[] { 1, 3, 5, 7, 9 });
            var expectedSet = new Set<int>();
            set.ExceptWith(set);
            Assert.Equal(expectedSet, set);
        }

        [Theory]
        [InlineData(new int[0], new[] { 1, 3 }, new[] { 1, 3 })]
        [InlineData(new[] { 1, 3, 5, 7 }, new int[0], new[] { 1, 3, 5, 7 })]
        [InlineData(new[] { 1, 3, 5, 7, 9 }, new[] { 11, 7, 13, 3, 9, 15 }, new[] { 1, 5, 11, 13, 15 })]
        public void SymmetricExceptWith_OtherSet_AllShouldPass(int[] firstArray, int[] secondArray, int[] expected)
        {
            var firstSet = new Set<int>(firstArray);
            var secondSet = new Set<int>(secondArray);
            var expectedSet = new Set<int>(expected);
            firstSet.SymmetricExceptWith(secondSet);
            Assert.Equal(expectedSet, firstSet);
        }

        [Fact]
        public void SymmetricExceptWith_Self_ShouldPass()
        {
            var set = new Set<int>(new[] { 1, 3, 5, 7, 9 });
            var expectedSet = new Set<int>();
            set.ExceptWith(set);
            Assert.Equal(expectedSet, set);
        }

        [Theory]
        [InlineData(new int[0], new[] { 1, 3 }, true)]
        [InlineData(new[] { 1, 3, 5, 7 }, new[] { 1, 7 }, false)]
        [InlineData(new[] { 1, 3, 5, 7, 9 }, new[] { 11, 7, 13, 3, 9, 15, 1, 5 }, true)]
        public void IsSubsetOf_OtherSet_AllShouldPass(int[] firstArray, int[] secondArray, bool expected)
        {
            var firstSet = new Set<int>(firstArray);
            var secondSet = new Set<int>(secondArray);
            bool actual = firstSet.IsSubsetOf(secondSet);
            Assert.Equal(expected, actual);
        }

        [Fact]
        public void StatisticsCollector_MainSetMethodsCalls_ShouldGetRightStatistics()
        {
            var statisticsCollector = new StatisticsCollector();
            var set = new Set<int>(new[] { 1, 3, 5, 7, 9 }, statisticsCollector);
            set -= 5;
            set -= 1;
            set -= 9;

            set += 15;
            set -= 15;

            set += new Set<int>(new[] { 11, 15, 17 }, statisticsCollector);
            set -= new Set<int>(new[] { 3, 11 }, statisticsCollector);

            set.Clear();
            Assert.Equal(58, statisticsCollector.Statistics);
        }
    }
}
