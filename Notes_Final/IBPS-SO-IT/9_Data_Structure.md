# 9. Data Structures & Algorithms

---

Fig- Logic symbol for the inverter.
When a HIGH level is applied to an inverter input, a LOW level will appear on its output. When a LOW lev el is
applied to its input, a HIGH will appear on its output as shown in Fig. This operation is summarized in Table, which
shows the output for each possible input in terms of levels a nd corresponding bits. A table such as this is called a
truth table, which gives the output state for all possible input combinations.
Input OUTPUT
LOW (0) HIGH (1)
HIGH (1) LOW (0)

Inverter operation

The operation of an inverter (NOT circuit) can be expressed as follows: If the input variable is called A and the output
variable is called X, then
X = A
This expression states that the output is the complement of the input, so if A = 0, then X = 1, and if A = 1, then X = 0.

### 9.3 The AND Gate

The term gate is used to describe a circuit that performs a basic logic operation. The AND gate is composed of two or
more inputs and a single output, as indicated by the standard logic symbols shown in Fig. Inputs are on the left, and
the output is on the right in  each symbol. Gates with two inputs are shown, however, a n AND gate can have any
number of inputs greater than one.

Operation of an AND Gate
An AND gate produces a HIGH output only when all of the inputs are HIGH. When any of the inputs is LOW, the
output is LOW. Therefore, the basic purpose of an AND gate is to determine when certain conditions are
simultaneously true, as indicated by HIGH levels on all of its inputs, and to produce a HIGH on its output to indicate
that all these conditions are true. T he inputs of the 2 -input AND gate in Fig. are label led A and B, and the output is
labelled X. The gate operation can be stated as follows:
For a 2 -input AND gate, output X is HIGH only when inputs A and B are HIGH; X is LOW when either A or B is
LOW, or when both A and B are LOW.

The logical operation o f a gate can be expressed with a truth table that lists all input combinations with the
corresponding outputs, as illustrated in Table for a 2-input AND gate. The truth table can be expanded to any number
of inputs. For any AND gate, regardless of the number of inputs, the output is HIGH only when all inputs are HIGH.
Input OUTPUT
A B X
0 0 0
0 1 0
1 0 0
1 1 1
1 = HIGH, 0 =LOW

The total number of possible combinations of binary inputs to a gate is determined by the following formula:
N=2n
Logic Expressions for an AND Gate
The logical AND function of two variables is represented mathematically either by placing a dot between the two
variables, as    A . B, or by simply writing the adjacent letters wit hout the dot, as AB. We will normally use the latter
notation because it is easier to write. Boolean multiplication follows the same basic rules governing binary
multiplication:
0 . 0 = 0
0 . 1 = 0
1 . 0 = 0
1 . 1 = 1

Boolean multiplication is the same as the AND function.

Fig. Boolean expressions for AND gates with two, three, and four inputs.

### 9.4 The OR Gate

An OR gate can have more than two inputs. The OR gate is another of the basic gates from which all logic functions
are constructed. An OR gate can have two or more inputs and performs what is known as logical addition.
An OR gate has two or more inputs and one output, as indicated by the standard logic symbol in Fig., where OR gates
with two inputs are illustrated. An OR gate can have any number of inputs greater than one.

Fig. Standard logic symbol for the OR gate.

Operation of an OR Gate

- An OR gate produces a HIGH on the output when any of the inputs is HIGH. The output is LOW only when
all of the inputs are LOW.

- **The inputs of the 2 ** — input OR gate in Fig. are labelled A and B. and the output is labelled X. The operation of
the gate can be stated as follows:

- **For a 2** — input OR gate, output X is HIGH when either input A or input B is HIGH, or when both A and B are
HIGH; X is LOW only when both A and B are LOW.

- The HIGH level is the active or asserted output level for the OR gate. Fig. illustrates the operation for a
2-input OR gate for all four possible input combinations.

Fig. All possible logic levels for a 2-input OR gate.

OR Gate Truth Table
The operation of a 2 -input OR gate is described in Table. This truth table can be expanded for any number of inputs;
but regardless of the number of inputs. the output is HIGH when one or more of the inputs are HIGH.
Table- The truth table for a 2-input OR gate.
Input OUTPUT
0 0 0
0 1 1
1 0 1
1 1 1
1 = HIGH, 0 =LOW

Logic Expressions for an OR Gate
The logical OR function of two variables is represented mathematically by a + between the two variables, for example,
A + B.
Addition in Boolean algebra i nvolves variables whose values are either binary 1 or binary 0. The basic rules for
Boolean addition are as follows:
0 + 0 = 0
0 + 1 = 1
1 + 0 = 1
1 + 1 = 1

Boolean addition is the same as the OR function.
Notice that Boolean addition differs from binary addition in the case whe re two 1 s are added. There is no carry in
Boolean addition.

The operation of a 2-input OR gate can be expressed as follows: If one input variable is A, if the other input variable
is B, and if the output variable is X, then the Boolean expression is
X=A+B
Fig. shows the OR gate logic symbol with two input variables and the output variable labelled.

### 9.5 The Nand Gate

The NAND gate is a popular logic element because it can be used as a universal gate: that is, NAND gates can be used
in combination to perform the AND, OR, and inverter operations.

The term NAND is a contraction of NOT-AND and implies an AND function with a complemented (inverted) output.
The standard logic symbol for a 2 -input NAND gate and its equivalency to an AN D gate followed by an inverter are
shown in Fig., where the symbol ≡ means equivalent to.

Fig. Standard NAND gate logic symbols

Operation of a NAND Gate
A NAND gate produces a LOW output only when all the inputs are HIGH. When any of the inputs is LOW, the
output will be HIGH. For the specific case of a 2 -input NAND gate, as shown in Fig with the inputs labelled A and B
and the output labelled X, the operation can be stated as follows:
For a 2 -input NAND gate, output X is LOW only when inputs A and B are  HIGH; X is HIGH when either A or B is
LOW, or when both A and B are LOW.
Note that this operation is opposite that of the AND in terms of the output level. In a NAND gate, the LOW level (0) is
the active or asserted output level, as indicated by the bubbl e on the output. Fig illustrates the operation of a 2 -input
NAND
gate for all four input combinations, and Table, is the truth table summarizing the logical operation of the 2 -input
NAND gate.
Note- The NAND is the same as the AND except the output is inverted.

Fig. Operation of a 2-input NAND gate.

Table- Truth table for a 2-input NAND gate.
Input OUTPUT
0 0 1
0 1 1

1 0 1
1 1 0
1 = HIGH, 0 =LOW
Logic Expressions for a NAND Gate
The Boolean expression for the output of a 2-input NAND gate is
X = AB
This expression says that the two input variables, A and B, are first ANDed and then complemented, as indicated by
the bar over the AND expression. This is a description in equation form of the operation of a NAND gate with two
inputs. Evaluating this exp ression for all possible values of the two input variables, you get the results shown in
Table.
A B 𝐴𝐵̅̅̅̅ = 𝑋
0 0 0.0̅̅̅̅ = 0̅ = 1
0 1 0.1̅̅̅̅ = 0̅ = 1
1 0 1.0̅̅̅̅ = 0̅ = 1
1 1 1.1̅̅̅̅ = 1̅ = 0

### 9.6 The NOR Gate

The NOR gate, like the NAND gate, is a useful logic element because it can also be used as a universal gate; that is,
NOR gates can be used in combination to perform the AND, OR, and inverter operations.
The term NOR is a contraction of NOT-OR and implies an OR function with an inverted (complemented) output. The
standard logic symbol for a 2-input NOR gate and its equivalent OR gate followed by an inverter are shown in Fig.

Fig. Standard NOR gate logic symbols.

Operation of a NOR Gate
A NOR gate produces a LOW output when any of its inputs is HIGH. Only when all of its inputs are LOW is the
output HIGH. For the specific case of a 2 -input NOR gate, as shown in  Fig. with the inputs labelled A and B and the
output labelled X, the operation can be stated as follows:
For a 2-input NOR gate, output X is LOW when either input A  or input B is HIGH, or when both A and B are HIGH;
X is HIGH only when both A and B are LOW.
This operation results in an output level opposite that of the OR gate. In a NOR gate, the LOW output is the active or
asserted output level as indicated by the bubble on the output.
Fig. illustrates the operation of a 2 -input NOR gate for all four poss ible input combinations, and Table, is the truth
table for a 2-input NOR gate.

Fig. Operation of a 2-input NOR gate.

Input OUTPUT
A B X
0 0 1
0 1 0
1 0 0
1 1 0
1 = HIGH, 0 =LOW
Table- Truth table for a 2-input NOR gate.

Logic Expressions for a NOR Gate
The Boolean expression for the output of a 2-input NOR gate can be written as
X = A + B̅̅̅̅̅̅̅

This equation says that the two input variables are first ORed and then complemented, as indicated by the bar over
the OR expression. Evaluating this expression,  you get the results shown in Table. The NOR expression can be
extended to more than two input variables by including additional letters to represent the other variables.
A B 𝐴 + 𝐵̅̅̅̅̅̅̅̅ = 𝑋
0 0 0 + 0̅̅̅̅̅̅̅ = 0̅ = 1
0 1 0 + 1̅̅̅̅̅̅̅ = 1̅ = 0
1 0 1 + 0̅̅̅̅̅̅̅ = 1̅ = 0
1 1 1 + 1̅̅̅̅̅̅̅ = 1̅ = 0

### 9.7 The Exclusive-Or and Exclusive-Nor Gates
Exclusive-OR and exclusive -NOR gates are formed by a combination of other gates already discussed. However,
because of their fundamental importance in many applications, these gates are often treated as basic logic elements
with their own unique symbols.

9.7 (a) The Exclusive-OR Gate
Standard symbol for an exclusive-OR (XOR for short) gate is shown in Fig. The XOR gate has only two inputs.

Fig. Standard symbol for an exclusive-OR.
For an exclusive-OR gate, output X is HIGH when the two inputs are different.
The four possible input combinations and the resulting outputs for an XOR gate are illustrated in Fig. The HIGH level
is the active or asserted output level and occurs only when the inputs are at opposite  levels. The operation of an XOR
gate is summarized in the table shown in Table.

Fig.  All possible logic levels for an exclusive-OR gate.

Table- Truth table for an exclusive-OR gate.
Input OUTPUT
A B X
0 0 0
0 1 1
1 0  1
1 1 0

9.7 (b) The Exclusive-NOR Gate
Standard symbols for an exclusive -NOR (XNOR) gate are shown in Fig. Like the XOR gate, an XNOR has only two
inputs. The bubble on the output of the XNOR symbol indicates that its output is opposite that of the XOR gate. When
the two input logic levels are opposite, the output of the exclusive -NOR gate is LOW. The operation can be s tated as
follows (A and B are inputs, X is the output):

For an exclusive-NOR gate, X is HIGH only when A and B are both HIGH or both LOW.

Fig. Standard logic symbols for the exclusive-NOR gate.

The four possible input combinations and the resulting out puts for an XNOR gate are shown in Fig. The operation of
an XNOR gate is summarized in Table. Notice that the output is HIGH when the same level is on both inputs.

Fig. All possible logic levels for an exclusive-NOR gate.

Table- Truth table for an exclusive-NOR gate.
Input OUTPUT
A B X
0 0 1
0 1 0
1 0  0
1 1 1

## 10. Combinational Logic Design

Logic circuits for digital systems may be combinational or sequential. A  combinational circuit consists of input
variables, logic gates, and output variables.

### 10.1 Half Adder and Full Adder Circuit

An adder is a digital circuit that performs addition of numbers. The half adder adds two binary digits called as
augend and addend and produces two outputs as sum and carry; XOR is applied to both inputs to produce sum and
AND gate is applied to both inputs to produce carry. The full adder adds 3 one bit numbers, where two can be
referred to as operands and one can be referred to  as bit carried in. And produces 2 -bit output, and these can be
referred to as output carry and sum.

Half adder Circuit
To understand what is a half adder you need to know what is an adder first. Adder circuit is a combinational digital
circuit that is used for adding two numbers. A typical adder circuit produces a sum bit ( denoted by S) and a carry bit
(denoted by C) as the output. Typically, adders are realized for adding binary numbers but they can be also realized
for adding other formats like BCD (bin ary coded decimal, XS-3 etc. Besides addition, adder circuits can be us ed for a
lot of other applications in digital electronics like address decoding, table index calculation etc.

Half adder is a combinational arithmetic circuit that adds two numbers and produces a sum bit (S) and carry bit (C) as
the output. If A and B ar e the input bits, then sum bit (S) is the X -OR of A and B  and the carry bit (C) will be the
AND of A and B. From this it is clear that, a half adder circuit can be easily constructed u sing one X-OR gate and one
AND gate. Half adder is the simplest of all adder circuit, but it has a major disadvantage.  The half adder can add
only two input bits (A and B) and has nothing to do with the carry if there is any in the input. So, if the input to a half
adder have a carry, then it will be neglected it and adds only the A and B bits. That means the binary addition process
is not complete and that’s why it is called a half adder. The truth table, schematic representation and XOR//AND
realization of a half adder are shown in the figure below.

Truth table, schematic and realization of half adder

NAND gates or NOR gates can be used for realizing the half adder in universal logic and the relevant circuit diagrams
are shown in the figure below.

Half adder using NAND & NOR logic

Full Adder
This adder is difficult to implement than a half-adder. The difference between a half-adder and a full-adder is that the
full-adder has three inputs and two outputs, whereas half adder has only two inputs and two  outputs. The first two
inputs are A and B and the third input is an input carry as C-IN. When a full-adder logic is designed, you string eight
of them together to create a byte-wide adder and cascade the carry bit from one adder to the next.

The output carry is designated as C-OUT and the normal output is designated as S.
Full Adder Truth Table:

With the truth -table, the full adder logic can be implemented. You can see that the output S is an XOR between the
input A and the half -adder, SUM output with B and C-IN inputs. We take C -OUT will only be true if any of the two
inputs out of the three are HIGH.
So, we can implement a full adder circuit with the help of two half adder circuits. At first, half adder will be used to
add A and B to produce a partial Sum and a second half adder logic can be used to add C-IN to the Sum produced by
the first half adder to get the final S output.

Full Adder Logic Circuit

If any of the half adder logic produces a carry, there will be an output carry. So, COUT will be  an OR function of the
half-adder Carry outputs.

Full Adder Design Using Half Adders

With this type of symbol, we can add two bits together, taking a carry from the next lower order of magnitude, and
sending a carry to the next higher order of magnitude . In a computer, for a multi -bit operation, each bit  must be
represented by a full adder and must be added simultaneously. Thus, to add two 8 -bit numbers, you will need 8 full
adders which can be formed by cascading two of the 4-bit blocks.
### 10.2 Binary Subtraction Circuits

Subtraction is a mathematical operation in which one integer number is deducted from another to obtain the
equivalent quantity. The number from which other number is to be deducted is called as minuend and the number
subtracted from the minuend is called subtrahend.

Half Subtractors
A half subtractor is a multiple output combinational logic network that does the subtraction of two bits of binary data.
It has input variables and two output variables. Two inputs are corresponding to two i nput bits and two output
variables corresponds to the difference bit and borrow bit.

The binary subtraction is also performed by the Ex-OR gate with additional circuitry to perform the borrow operation.
Thus, a half subtractor is designed by an Ex -OR gate including AND gate with A input com plemented before fed to
the gate.

Full Subtractor
A combinational logic circuit that performs a subtraction between the two binary bits by considering borrow of the
lower significant stage is called as the full subtractor. In this, subtraction of the two digits is performed by taking into
consideration whether a 1 has already borrowed by the previous adjacent lower minuend bit or not.

Half-subtractor is a  combinational circuit  capable of subtracting a binary number fr om another binary number. It
produces two outputs: difference and borrow. The borrow output specifies whether a binary number 1 is borrowed to
perform subtraction or not.

Graphic symbol of half-subtractor

The inputs are A and B. The output D is the result of subtraction of B from A and output B0 is the borrow output.
A B D B0
0 0 0 0
0 1 1 1
1 0 1 0
1 1 0 0
Table 1: Truth Table of half-subtractor

### 10.3 Decoders and Multiplexers

Decoders
A decoder is a circuit which has n inputs and 2 n outputs, and outputs 1 on the wire corresponding to the binary
number represented by the inputs. For example, a 2-4 decoder might be drawn like this:

The Decoder Circuit
The following circuit generates all four minterms from two inputs, and implements the 2-4 decoder.

Larger decoders can be implemented in the same way. Here is a 3-8 decoder.

Multiplexers
Multiplexing is the property of combining one or more signals and transmitting on a single channel. This is achieved
by the device multiplexer. A multiplexer  is the most frequently used combinational circuits and important building
block in many in digital  systems. A multiplexer is a device which allows one of a number of inputs to be routed to a
single output. Here is a 4-1 multiplexer.

Multiplexers are useful in many situations. For example, in a CPU, data being written to memory might come from
one of a number of sources - from a register, from the result of a calculation, etc - so a multiplexer would be used to
select data from the appropriate source.

### 10.4 Parity Generator and Checker

A parity generator is a combinational logic circuit that generates the parity bit in the transmitter. On the other hand, a
circuit that checks the parity in the receiver is called parity checker. A combined circuit or devices of parity generators
and parity checkers are commonly used in digital systems to detect the single bit errors in the transmitted data word.
The sum of the data bits and parity bits can be even or odd. In even parity, the added parity bit will make the t otal
number of 1s an even amount whereas in odd parity the added parity bit will make the total number of 1s odd
amount.

Parity Generator
It is combinational circuit that accepts an n -1 bit stream data and generates the additional bit that is to be transm itted
with the bit stream. This additional or extra bit is termed as a parity bit.

In even parity bit scheme, the parity bit is ‘0’ if there are even number of 1s in the data stream and the parity bit is ‘1’
if there are odd number of 1s in the data stream.

In odd parity bit scheme, the parity bit is ‘1’ if there are even number of 1s in the data stream and the parity bit is ‘0’ if
there are odd number of 1s in the data stream. Let us discuss both even and odd parity generators.

Even Parity Generator
Let us assume that a 3 -bit message is to be transmitted with an even parity bit. Let the three inputs A, B and C are
applied to the circuits and output bit is the parity bit P. The total number of 1s must be even, to generate the even
parity bit P.

Odd Parity Generator
Let us consider that the 3-bit data is to be transmitted with an odd parity bit. The three inputs are A, B and C and P is
the output parity bit. The total number of bits must be odd in order to generate the odd parity bit.

Parity Check
It is a logic circuit that checks for possible errors in the transmission. This circuit can be an even parity checker or odd
parity checker depending on the type of parity generated at the transmission end. When this circuit is used as even
parity checker, the number of input bits must always be even.
When a parity error occurs, the ‘sum even’ out put goes low and ‘sum odd’ output goes high. If this logic circuit is
used as an odd parity checker, the number of input bits should be odd, but if an error occurs the ‘s um odd’ output
goes low and ‘sum even’ output goes high.

Even Parity Checker
Consider that three input message along with even parity bit is generated at the transmitting end. These 4 bits are
applied as input to the parity checker circuit which checks th e possibility of error on the data. Since the data is
transmitted with even parity, four bits received at circuit must have an even number of 1s.
If any error occurs, the received message consists of odd number of 1s. The output of the parity checker is denoted by
PEC (parity error check).

Odd Parity Checker
Consider that a three-bit message along with odd parity bit is transmitted at the transmitting end. Odd parity checker
circuit receives these 4 bits and checks whether any error are present in the data.
If the total number of 1s in the data is odd, then it indicates no error, whereas if the total number of 1s is even then it
indicates the error since the data is transmitted with odd parity at transmitting end.

Parity Generator/Checker ICs
There are dif ferent types of parity generator /checker ICs are available with different i nput configurations such as
5-bit, 4-bit, 9-bit, 12-bit, etc. A most commonly used and standard type of parity generator/checker IC is 74180.
It is a 9-bit parity generator or checker used to detect errors in high speed data transmission or data retrieval systems.
This IC can be used to generate a 9 -bit odd or even parity code or it can be used to check for odd or even parity in a
9-bit code (8 data bits and one parity bit).

This IC consists of eight parity inputs from A through H and two cascading input s. There are two outputs even sum
and odd sum. In implementing generator or checker circuits, unused parity bits must be tied to logic zero and the
cascading inputs must not be equal.

## 11. Flip Flop

Flip flops are actually an application of logic gates. With the help of Boolean logic, you can create memory with them.
Flip flops can also be considered as the most basic idea of a Random-Access Memory [RAM]. When a certain input
value is given to them, t hey will be remembered and executed, if the logic gates are designed correctly. A higher
application of flip flops is helpful in designing better electronic circuits.
The most commonly used application of flip flops is in the implementation  of a feedback c ircuit. As a memory relies
on the feedback concept, flip flops can be used to design it.

A digital computer needs devices which can store information. A flip flop is a binary storage device. It can store
binary bit either 0 or 1. It has tw o stable states HIGH and LOW i.e. 1 and 0. It has the property to remain in one state
indefinitely until it is directed by an input signal to switch over to the other state. It is also called bistable
multivibrator.
There are mainly four types of flip flops that are used in electronic circuits. They are-
## 1. The basic Flip Flop or S-R Flip Flop
## 2. Delay Flip Flop [D Flip Flop]
## 3. J-K Flip Flop
## 4. T Flip Flop

### 11.1 S-R Flip Flop

The SET-RESET flip flop is designed with the help of two NOR gates and also two  NAND gates. These flip flops are
also called S-R Latch.
S-R Flip Flop using NOR Gate
The design of such a flip flop includes two inputs, called the SET [S] and RESET [R]. There are also two outputs, Q
and Q’. The diagram and truth table is shown below.

Basic flip-flop circuit with NOR gates
S-R Flip Flop using NOR Gate

From the diagram it is evident that the flip flop has mainly four states. They are
S=1, R=0—Q=1, Q’=0

This state is also called the SET state.
S=0, R=1—Q=0, Q’=1

This state is known as the RESET state.
In both the states you can see that the outputs are just compliments of each other and that the value of Q follows the
value of S.
S=0, R=0—Q & Q’ = Remember

If both the values of S and R are switched to 0, then the circuit remembers the value of S and R in their previous state.
S=1, R=1—Q=0, Q’=0 [Invalid]

This is an invalid state because the values of both Q and Q’ are 0. They are supposed to be compliments of each other.
Normally, this state must be avoided.

S-R Flip Flop using NAND Gate
The circuit of the S-R flip flop using NAND Gate and its truth table is shown below.
Like the NOR Gate S-R flip flop, this one also has four states. They are

Basic flip-flop circuit with NAND gates
S-R Flip Flop using NAD gate
S=1, R=0—Q=0, Q’=1
This state is also called the SET state.
S=0, R=1—Q=1, Q’=0
This state is known as the RESET state.

In both the states you can see that the outputs are just compliments of each other and that the value of Q follows the
compliment value of S.
S=0, R=0—Q=1, & Q’ =1 [Invalid]
If both the values of S and R are switched to 0 it is an invalid state because the values of both Q and Q’ are 1. They are
supposed to be compliments of each other. Normally, this state must be avoided.
S=1, R=1—Q & Q’= Remember

If both the values of S and R are switched to 1, then the circuit remembers the value of S and R in their previous state.

### 11.2 Clocked S-R Flip Flop

It is also called a Gated S-R flip flop.
The problems with S -R flip flops using NOR and NAND gate is the invalid state. This problem can be overcome by
using a bi stable SR flip -flop that can change outputs when certain invalid states are met, regardless of the condition
of either the Set or the Reset inputs. For this, a clocked S -R flip flop is designed by a dding two AND gates to a basic
NOR Gate flip flop. The circuit diagram and truth table is shown below.

Cocked S-R Flip Flop
A clock pulse [CP] is given to the inputs of the AND Gate. When the value of the clock pulse is ‘0’, the outputs of both
the AND Gates remain ‘0’. As soon as a pulse is given the value of CP turns ‘1’. This makes the values at S and R to
pass through the NOR Gate flip flop. But when the values of both S and R values turn ‘1’, the HIGH value of CP
causes both of them to turn to ‘0’ fo r a sh ort moment. As soon as the pulse is removed, the flip flop state becomes
intermediate. Thus either of the two states may be caused, and it depends on whether the set or reset input of the
flip-flop remains a ‘1’ longer than the transition to ‘0’ at the end of the pulse. Thus the invalid states can be eliminated.

### 11.3 D Flip Flop

The circuit diagram and truth table is given below.

D flip flop is actually a slight modification of the above explained clocked SR flip -flop. From the figure you can see
that the D input is connected to the S input and the complement of the D input is connected to the R input. The D

input is passed on to the flip flop when the value of CP is ‘1’. When CP is HIGH, the flip flop moves to the SET state.
If it is ‘0’, the flip flop switches to the CLEAR state.

### 11.4 J-K Flip Flop
The circuit diagram and truth-table of a J-K flip flop is shown below.

A J-K flip flop can also be defined as a modification of the S -R flip flop. The only difference is that the intermediate
state is more refined and precise than that of a S-R flip flop.
The behaviour of inputs J and K is same as the S and R inputs of the S -R flip flop. The letter J stands for SET and the
letter K stands for CLEAR.

When both the inputs J and K have a HIGH state, the flip-flop switch to the complement state. So, for a value of Q = 1,
it switches to Q=0 and for a value of Q = 0, it switches to Q=1.

The circuit includes two 3 -input AND gates. The output Q of the flip flop is returned back as a fee dback to the input
of the AND along with other inputs like K and clock pulse [CP]. So, if the value of CP is ‘1’, the flip flop gets a CLEAR
signal and with the condition that the value of Q was earlier 1. Similarly output Q’ of the flip flop is given as a
feedback to the input of t he AND along with other inputs like J and clock pulse [CP]. So, the output becomes SET
when the value of CP is 1 only if the value of Q’ was earlier 1.

The output may be repeated in transitions once they have been complimented f or J=K=1 because of the fee dback
connection in the JK flip -flop. This can be avoided by setting a time duration lesser than the propagation delay
through the flip -flop. The restriction on the pulse width can be eliminated with a master -slave or edge -triggered
construction.

### 11.5 T Flip Flop

This is a much simpler version of the J -K flip flop. Both the J and K inputs are connected together and thus are also
called a single input J-K flip flop. When clock pulse is given to the flip flop, the output begins to  toggle. Here also the
restriction on the pulse width can be eliminated with a master-slave or edge-triggered construction. Take a look at the
circuit and truth table below.

### 11.6 Edge-triggered Flip-Flop

The pulse goes from a low level 0 volt, the positive logical 0 condition, to a high level (+5 volts) , the positive logic logical 1
condition going between the two logic levels at a fixed frequency rate. A clock signal as seen in Figure, has two transitions,
one from low to high level the other from high to low level. For positiv e logic operation, we def ine the low to high
transition as the leading edge of the clock signal, while the transition from high to low is called the clock trailing edge.

Some flip flop circuits are triggered by the clock leading edge while other units are triggered on the clock trailing edge. The
particular flip flop specifications will provide this information as we shall see. Some flip flop are other logic units are
triggered when the clock reaches prescribed voltage levels or goes from one voltage leve l to another usually with out
regard to voltage rise or fall time. A circuit clocked by the leading edge, is referred to as being positive edge triggered while
another circuit triggering on the trailing edge, is negative edge triggered.

Positive Edge Triggered Flip Flop
In positive edge triggered flip flops the clock samples the input line at the positive edge (rising edge or leading edge)
of the clock pulse. The state of the output of the flip flop is set or reset depending upon the state of the input at
positive edge of the cloc k. This state of the output remains for one clock cycle and the clock again samples the input
line on the next positive edge of the clock . The arrow head at clock terminal indicates positive edge triggering. The
arrow head symbol is termed as dynamic signal indicator.

Positive Edge Triggered JK Flip Flop

Negative Edge Triggered Flipflop-
In negative edge triggered flip flops the clock samples the input lines at the negative edge (falling edge or trailing
edge) of the clock puls e. The output of the flip flop is set or reset at the negative edge of the clock pulse. A symbolic
representation of negative edge triggeri ng has been shown in Figure . A small circle is put before the arrow head to
indicate negative edge triggering.

Negative Edge Triggered Flip Flop

- Example: Positive Edge-Triggered D Flip-Flop

on the positive edge (while the clock is going from 0 to 1), the input D is read, and almost immediately propagated to
the output Q. Only the value of D at the positive.

Symbol

- **Symbol of edge-triggered D flip** — flop

Flip-Flop Timing

- **Set** — up time: ts
Input needs to be stable before trigger

- Hold time: th
Input needs to be stable after trigger

- Propagation delay: tp
Some delay from trigger to output change

- Example: Negative edge triggered flip-flip

### 11.7 Flip-flop Conversions

The purpose is to convert a given type A FF to a desired type B FF using some conversion logic.

The key here is to use the excitation table, which shows the necessary triggering signal (S,R, J,K, D and T) for a desired
flip-flop state transition :

Qt Qt+1 S R J L D T
0 0 0 X 0 X 0 0
0 1 1 0 1 X 1 1
1 0 0 1 X 1 0 1
1 1 X 0 X 0 1 0

Example: Convert a D-FF to a T-FF:

We need to design the circuit to generate the triggering signal D as a function of T and Q:
D = f(T, Q)

Consider the excitation table:
Qt Qt+1 T D
0 0 0 0
0 1 1 1
1 0 1 0
1 1 0 1

Treating D as a function of T and current FF state Q (QT), we have
D = T’Q +TQ’ = T  Q

Example 2: Convert a RS-FF to a D-FF:

We ne ed to design the circuit to generate the triggering signals S and R as functions of D and Q Consider the
excitation table:

Qt Qt+1 D S R
0 0 0 0 X
0 1 1 1 0
1 0 0 0 1
1 1 1 X 0

The desired signal S and R can be obtained as functions of T and current FF state Q from the Karnaugh maps:

Example 3: Convert a RS-FF to a JK-FF

We need to design the circuit to generate the triggering signals S and R as functions of J, K and Q. Consider the
excitation table:
Qt Qt+1 J K S R
0 0 0 X 0 X
0 1 1 X 1 0
1 0 X 1 0 1
1 1 X 0 X 0

The desired signal S and R as functions of J, K and current FF state Q can be obtained from the Karnaugh maps:

### 11.8 Counters

Counter is a sequential circuit. A digital circuit which is used for a counting pulses is known count er. Counter is the
widest application of flip-flops. It is a group of flip-flops with a clock signal applied. Counters are of two types.

Asynchronous or ripple counters
The logic diagram of a 2 -bit ripple up counter is shown in figure. The toggle (T) flip -flop are being used. But we can
use the JK flip-flop also with J and K connected permanently to logic 1. External clock is applied to the clock input of
flip-flop A and QA output is applied to the clock input of the next flip-flop i.e. FF-B.

Logical Diagram-

Truth Table
Clock Counter output State
Number
Decimal Counter
Output QS QA
Initially 0 0 – 0
1st 0 1 1 1
2nd 1 0 2 2
3rd 1 1 3 3
4th 0 0 4 0

Synchronous counters

If the "clock" pulses are applied to all the flip -flops in a counter simult aneously, then such a counter is called as
synchronous counter.
2-bit Synchronous up counter

The J A and K A inputs of FF -A are tied to logic 1. So FF-A will work as a toggle flip -flop. The J B and K B inputs are
connected to QA.

Logical Diagram

### 11.9 RAM-

In computers, digital control systems, information processing systems, etc. it is necessary to store digital data and
retrieve the data as desire d. For this purpose, earlier only magnetic memory devices were possible, whereas these
days it has become pos sible to make memory devices using semiconductor devices. Semiconductor memories have
become very popular because of their small size (available in ICs) and convenience to use.
FLIP-FLOPS can be used for making memories in which data can be stored for any  desired length of time and then
read out whenever required. In such a memory, data can be put into (writing into the Memory) or retrieved from
(reading from the memory) the memory in a random fashion and is known as random-access memory.

A 1-bit read/write memory is shown in Fig. which is the basic memory element and memory ICs are built around a
system of basic 1-bit cell.

In this memory cell, a level D FLIP-FLOP is used which has Q output that follows the D input as long as G terminal is
at logic 1. The moment the G input changes to logic 0, the Q output does not change, and it retains the D input level
that existed just before the transition from 1 to 0 at input G. This input is used to select the memory cell. In the 1 -bit
cell shown there are three inputs–D1 (data input), A (address select) and R/W (read/write control) and one output D0
(data output). A= 0, all input and output activities are blocked, and the cell is in the hold mode where its stored
output is protected.
The complete f unction of th is cell can be Understood from the function table of Table. The read operation is
nondestructive, that is, the stored bit can be read out any number of times without disturbing it. The stored bit will be
protected as long as power is on. Therefore, this type-of memory is known as volatile memory.
As far as writing into the cell is concerned, it is not required to be cleared before entering the new bit. Whenever a
new bit is entered the earlier one gets destroyed automatically.

## 12. Sequential Logic Design

Unlike Combinational Logic circuits that change state depending upon the actual signals being applied to their inputs
at that time, Sequential Logic circuits have some form of inherent “Memory” built in. This means that sequential logic
circuits are able to take into account their previous input state as well as those actually present, a sort of  “before” and
“after” effect is involved with sequential circuits. In other words, the output state of a “sequential logic circui t” is a
function of the following thre e states, the “present input”, the “past input” and/or the “past output”.  Sequential
Logic circuits remember these conditions and stay fixed in their current state until the next clock signal changes one of
the states, giving sequential logic circuits “Memory”.

Sequential Logic Representation

The word “Sequential” means that things happen in a “sequence”, one after another and in  Sequential Logic circuits,
the actual clock signal determines when things will happen n ext. Simple sequential logic circuits can be constructed
from standard  Bistable circuits such as:  Flip-flops, Latches and Counters and which themselves can be made by
simply connecting together universal NAND Gates and/or NOR Gates in a particular combinational way to produce
the required sequential circuit.

### 12.1 Classification of Sequential Logic
As standard logic gates are the building blocks of combin ational circuits, bistable latches and flip -flops are the basic
building blocks of sequential logic circuits. Sequential logic circuits can be constructed to produce either simple
edge-triggered flip-flops or more complex sequential circuits such as storage registers, shift registers, memory devices
or counters. Either way sequential logic circuits can be divided into the following three main categories:

1. Event Driven – asynchronous circuits that change state immediately when enabled.
2. Clock Driven – synchronous circuits that are synchronized to a specific clock signal.
3. Pulse Driven – which is a combination of the two that responds to triggering pulses.

Latches: Latches and flip flops are the basic elements and these are used to store information.  One flip flop and latch
can store one bit of data. The main difference between the latches and flip flops is that, a latch checks input

continuously and changes the output whenever there is a change in input. But, flip flop is a combination of latch and
clock that continuously checks input and changes the output time adjusted by the clock. In this article, we are going to
look at the operations of the numerous latches and flip-flops.

### 12.2 Shift Registers
The Shift Register is another type of sequential l ogic circuit that is used for the storage or transfer of data in the form
of binary numbers and then "shifts" the data out once every clock cycle, hence the name shift r egister. It basically
consists of several single bit "D -Type Data Latches", one for eac h bit (0 or 1) connected together in a serial or
daisy-chain arrangement so that the output from one data latch becomes the input of the next latch and so on. The
data bits may be fed in or out of the register serially, i.e. one after the other from either  the left or the right direction,
or in parallel, i.e. all together. The number of individual data latches required to make up a single Shift Register is
determined by t he number of bits to be stored with the most common being 8 -bits wide, i.e. eight indiv idual data
latches.
Shift Registers are used for data storage or data movement and are used in calculators or computers to store data such
as two binary numbers before they are added together, or to convert the data from either a serial to parallel or parallel
to serial format. The individual data latches that make up a single shift register are all driven by a common clock (Clk)
signal making them synchronous devices. Shift register IC's are generally provided with a clear or reset connection so
that they can be "SET" or "RESET" as required.
Generally, shift registers operate in one of four different modes with the basic movement of data through a shift
register being:

- **Serial-in to Parallel-out (SIPO) ** — The register is loaded with serial data, one bit at a time, with the stored data being
available in parallel form.

- **Serial-in to Serial-out (SISO) ** — The data is shifted serially "IN" and "OUT" of the register, one bit at a time in either
a left or right direction under clock control.

- **Parallel-in to Serial -out (PISO) ** — The parallel data is loaded into the register simultaneously and is shifted out of
the register serially one bit at a time under clock control.

- **Parallel-in to Parallel -out (PIPO) ** — The parallel data is loaded simultaneously i nto the register, and t ransferred
together to their respective outputs by the same clock pulse.

4-Bit Bidirectional Universal Shift Register
This bidirectional shift register is designed to incorporate virtually all of the features a system designer may want in a
shift register ; they feature parallel inputs, parallel outputs, right -shift and left -shift serial inputs,
operating-mode-control inputs, and a direct overriding clear line. The register has four distinct modes of operation,
namely:
A) Parallel
B) load Shift right
C) Shift left
D) Inhibit clock

## 13. Ring Counter

Ring counters are a type of counter created using shift registers. A shift register is constructed using D -type flip-flops
where the output of one flip -flop is connected to the input of an other flip-flop. With ring counters, the output of the
last flip-flop is fed to the input of the first flip -flop. Ring counters do not count using normal binary code, but their
internal state can be used to decode to any output sequence wanted. There are two types of ring counters:
a) Straight ring counter
b) Johnson counter
There is a third counter type using a shift register, the Linear Feedback Shift Register (LFSR). It has a more elaborate
feedback circuit than the other two ring counters.

a. Straight Ring Counter
A straight ring counter or Overbeck counter connects the output of the last flip -flop to the first flip -flop input and
circulates a single one bit around the ring. It provides a one -hot counting sequence. For example, in a 4 -register ring
counter, w ith initial register values of 1000, the repeating sequence is 1000, 0100, 0010, 0001. Note that one of the
flip-flops must be pre -loaded with a logic 1 in order for it to operate properly. Also note that an n -bit ring counter
cycles through exactly n states. A schematic of a 4 -bit straight ring counter is given below. The asynchronous reset
will set the initial contents of the counter to 1000 (note that the least significant flip-flop is on the left side).

b. Johnson Counter
Another form of ring counter is created by feeding back the complement of the contents of the last flip -flop to the
input of the first flip -flop. This is called a twisted ring counter, but is better known as the Johnson counter. The
alternative term Möbius counter is found in many books and articles because the Johnson counter resembles the
famous Möbius strip. For example, in a 5-flip-flop Johnson counter with an initial register contents (or state) of 00000,
the repeating sequence is 00000, 10000, 11000, 11100, 11110, 11111, 01111, 00111, 00011, 00001. When observing the
pattern, it can be seen that any changes between succeeding states, only one flip-flop changes state. As a result, any of
these states is directly, spike-free decodable with only a two-input gate [5, 6].




---

## Interactive Practice Quiz Deck

Test your mastery with our complete interactive multiple-choice assessment deck. Select an answer to evaluate your reasoning and reveal detailed explanatory feedback!

```quiz
[
  {
    "question": "Q1. In computers, subtraction is generally carried out by?",
    "options": [
      "9’s complement",
      "10’s complement",
      "1’s complement",
      "2’s complement",
      "None of these"
    ],
    "correctIndex": 3,
    "explanation": "2.  (b) 3.  (a) 4.  (c) 5.  (c) 6.  (b) 7.  (a)"
  },
  {
    "question": "Q2. The number of bus controllers that are used for interfacing of memory and I/O devices is?",
    "options": [
      "1",
      "2",
      "3",
      "None of the mentioned",
      "5"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q3. If MBYTES input is high, then the pin serves as?",
    "options": [
      "AEN",
      "CEN",
      "AEN and CEN",
      "None of the mentioned",
      "GEN"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q4. What characteristic of RAM memory makes it not suitable for permanent storage?",
    "options": [
      "too slow",
      "unreliable",
      "it is volatile",
      "too bulky",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q5. The average time required to reach a storage location in memory and obtain its contents is called the?",
    "options": [
      "seek time",
      "turnaround time",
      "access time",
      "transfer time",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q6. Which of the following is not a weighted code?",
    "options": [
      "Decimal Number system",
      "Excess 3-cod",
      "Binary number System",
      "Machine number system",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q7. In the application where all the interrupting devi ces are of equal priority, the mode used is?",
    "options": [
      "automatic rotation",
      "automatic EOI mode",
      "specific rotation",
      "EOI",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q8. In cascaded mode, the number of vectored interrupts provided by 8259A is?",
    "options": [
      "4",
      "8",
      "16",
      "64",
      "None of these"
    ],
    "correctIndex": 3,
    "explanation": "9.  (d) 10.  (b) 11.  (a) 12.  (c) 13.  (d) 14.  (b)"
  },
  {
    "question": "Q9. The circuit used to store one bit of data is known as?",
    "options": [
      "Register",
      "Encoder",
      "Decoder",
      "Flip Flop",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q10. The pin that requests the access of the system bus is?",
    "options": [
      "HLDA",
      "HRQ",
      "ADSTB",
      "none of the mentioned",
      "CEN"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q11. In a memory -mapped I/O system, which of the following will not be there?",
    "options": [
      "LDA",
      "IN",
      "ADD",
      "OUT",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q12. The number of hardware interrupts that the processor 8085 consists of is?",
    "options": [
      "1",
      "3",
      "5",
      "7",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q13. Write Through technique is used in which memory for updating the data?",
    "options": [
      "Virtual memory",
      "Main memory",
      "Auxiliary memory",
      "Cache memory",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q14. Generally Dynamic RAM is used as main memory in a computer system as it?",
    "options": [
      "Consumes less power",
      "has higher speed",
      "has lower cell density",
      "needs refreshing circuitry",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q15. The 8257 is able to accomplish the operation of?",
    "options": [
      "verifying DMA operation",
      "write operation",
      "read operation",
      "all of the mentioned",
      "Only",
      "and",
      ""
    ],
    "correctIndex": 3,
    "explanation": "16.  (a) 17.  (c) 18.  (b) 19.  (c) 20.  (d) 21.  (d)"
  },
  {
    "question": "Q16. Virtual memory consists of?",
    "options": [
      "Static RAM",
      "Dynamic RAM",
      "Magnetic memory",
      "Cache memory",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q17. A Stack-organised Computer uses instruction of?",
    "options": [
      "Indirect addressing",
      "Two-addressing",
      "Zero addressing",
      "Index addressing",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q18. The bus is available when the DMA controller receives the signal?",
    "options": [
      "HRQ",
      "HLDA",
      "DACK",
      "all of the mentioned",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q19. The register of 8257 that can only be written in is?",
    "options": [
      "DMA address register",
      "terminal count register",
      "mode set register",
      "status register",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q20. An n-bit microprocessor has?",
    "options": [
      "n-bit program counter",
      "n-bit address register",
      "n-bit ALU",
      "n-bit instruction register",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q21. In 8257 register format, the selected channel is disabled after the terminal count condition is reached when",
    "options": [
      "auto load is set",
      "auto load is reset",
      "TC STOP bit is reset",
      "TC STOP bit is set",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q22. The multiplicand register & multiplier register of a hardware circuit implementing booth’s algorithm have (11101) & (1100). The result shall be",
    "options": [
      "(812) 10",
      "(-12) 10",
      "(12) 10",
      "(-812) 10",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "23.  (a) 24.  (d) 25.  (b) 26.  (b) 27.  (a) 28.  (d)"
  },
  {
    "question": "Q23. PSW is saved in stack when there is a",
    "options": [
      "interrupt recognised",
      "execution of RST instruction",
      "Execution of CALL instruction",
      "All of these",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q24. The IOW (active low) in its slave mode loads the contents of data bus to",
    "options": [
      "8-bit mode register",
      "upper/lower byte of 16-bit DMA address register",
      "terminal count register",
      "all of the mentioned",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q25. A k-bit field can specify any one of",
    "options": [
      "3k registers",
      "2k registers",
      "K2 registers",
      "K3 registers",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q26. In reading the columns of a keyboard matrix, when no key is pressed then all the pins show",
    "options": [
      "0",
      "1",
      "F",
      "7",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q27. The instructions which copy information from one location to another either in the processor’s internal register set or in the external main memory are called",
    "options": [
      "Data transfer instructions.",
      "Program control instructions.",
      "Input-output instructions.",
      "Logical instructions.",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q28. What are the actual steps that are followed in identifying any key that is being pressed?",
    "options": [
      "wait for the debounce time",
      "identify the key that is pressed",
      "initially no key should be pressed",
      "all of the mentioned",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q29. Memory access in RISC architecture is limited to instructions",
    "options": [
      "CALL and RET",
      "PUSH and POP",
      "STA and LDA",
      "MOV and JMP",
      "None of these"
    ],
    "correctIndex": 2,
    "explanation": "30.  (a) 31.  (a) 32.  (b) 33.  (a) 34.  (a) 35.  (c)"
  },
  {
    "question": "Q30. To identify that the key is present in which row and the column",
    "options": [
      "we ground the bits of the row one by one",
      "we ground the bits of the column one by one",
      "we connect the bits of the row to the logic level 1 one by one",
      "we can connect the columns to the logic level 1 one by one",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q31. PC Program Counter is also called ……………….",
    "options": [
      "instruction pointer",
      "memory pointer",
      "data counter",
      "file pointer",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q32. The registers that store the keyboard and display modes and operations programmed by CPU are",
    "options": [
      "I/O control and data buffers",
      "control and timing registers",
      "return buffers",
      "display address registers",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q33. CPU does not perform the operation ………………",
    "options": [
      "data transfer",
      "logic operation",
      "arithmetic operation",
      "all of the above",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q34. The access time of memory is …………… the time required for performing any single CPU operation.",
    "options": [
      "Longer than",
      "Shorter than",
      "Negligible than",
      "Same as",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q35. The sensor RAM acts as 8-byte first-in-first-out RAM in",
    "options": [
      "keyboard mode",
      "strobed input mode",
      "keyboard and strobed input mode",
      "scanned sensor matrix mode",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q36. The data that  is entered from the left side of the display unit is of",
    "options": [
      "left entry mode",
      "right entry mode",
      "left and right entry modes",
      "Upper entry mode",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "37.  (b) 38.  (c) 39.  (d) 40.  (d) 41.  (b) 42.  (a)"
  },
  {
    "question": "Q37. Data hazards occur when ……",
    "options": [
      "Greater performance loss",
      "Pipeline changes the order of read/write access to operands",
      "Some functional unit is not fully pipelined",
      "Machine size is limited",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q38. Which of the following is not a mode of data transmission?",
    "options": [
      "simplex",
      "duplex",
      "semi duplex",
      "half duplex",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q39. Interrupts which are initiated by an instruction are",
    "options": [
      "internal",
      "external",
      "hardware",
      "software",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q40. TXD(Transmitted Data Output) pin carries serial stream of the transmitted data bits along with",
    "options": [
      "start bit",
      "stop bit",
      "parity bit",
      "all of the mentioned",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q41. In 8257 (DMA), each of the four channels has",
    "options": [
      "a pair of two 8-bit registers",
      "a pair of two 16-bit registers",
      "one 16-bit register",
      "one 8-bit register",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q42. Logic gates with a set of input and outputs is arrangement of",
    "options": [
      "Computational circuit",
      "Logic circuit",
      "Design circuits",
      "Register",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q43. A micro program sequencer",
    "options": [
      "generates the address of next micro instruction to be executed.",
      "generates the control signals to execute a microinstruction.",
      "sequentially averages all microinstructions in the control memory.",
      "enables the efficient handling of a micro program subroutine.",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "44.  (c) 45.  (a) 46.  (d) 47.  (a) 48.  (b) 49.  (d)"
  },
  {
    "question": "Q44. The common register(s) for all the four channels of 8257 are",
    "options": [
      "DMA address register",
      "terminal count register",
      "mode set register and status register",
      "none of the mentioned",
      "Both",
      "and",
      ""
    ],
    "correctIndex": 5,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q45. In Reverse Polish notation, expression A*B+ C*D is written as",
    "options": [
      "AB*CD*+",
      "A*BCD*+",
      "AB*CD+*",
      "A*B*CD+",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q46. Suppose that a bus has 16 data lines and requires 4 cycles of 250 nsecs each to transfer data. The bandwidth of this bus would be 2 Megabytes/sec. If the cycle ti me of the bus was reduced to 125 nsecs and the number of cycles required for transfer stayed the same what would the bandwidth of the bus?",
    "options": [
      "1 Megabyte/sec",
      "4 Megabytes/sec",
      "8 Megabytes/sec",
      "2 Megabytes/sec",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q47. The amount of time required to read a block of data from a disk into memory is composed of seek time, rotational latency, and transfer time. Rotational latency refers to",
    "options": [
      "the time its takes for the platter to make a full rotation",
      "the time it takes for th e read-write head to move into position over the appropriate track",
      "the time it takes for the platter to rotate the correct sector under the head",
      "none of the above",
      "All of the above"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q48. The IOR (active low) input line acts as output in",
    "options": [
      "slave mode",
      "master mode",
      "master and slave mode",
      "none of the mentioned",
      "All of the mentioned"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q49. Computers use addressing mode techniques for ___.",
    "options": [
      "giving programming versatility to the user by providing facilities as pointers to memory counters for loop control",
      "to reduce no. of bits in the field of instruction",
      "specifying rules for modifying or interpreting address field of the instruction",
      "All the above",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q50. The pin that disables all the DMA channels by clearing the mode registers is",
    "options": [
      "MARK",
      "CLEAR",
      "RESET",
      "READY",
      "None of these"
    ],
    "correctIndex": 2,
    "explanation": "51.  (b) 52.  (c) 53.  (a) 54.  (b) 55.  (c) 56.  (d)"
  },
  {
    "question": "Q51. (2FAOC) 16 is equivalent to",
    "options": [
      "(195 084) 10",
      "(001011111010 0000 1100) 2",
      "Both",
      "and",
      "",
      "(194 085)10",
      "None of these"
    ],
    "correctIndex": 3,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q52. The pin that is used to write data to t he addressed memory location, during DMA write operation is",
    "options": [
      "MEMR (active low)",
      "AEN",
      "MEMW (active low)",
      "IOW (active low)",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q53. The register that stores all the interrupt requests in it in order to serve them one by one on priority basis is",
    "options": [
      "Interrupt Request Register",
      "In-Service Register",
      "Priority resolver",
      "Interrupt Mask Register",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q54. If memory access takes 20 ns with cache and 110 ns without it, then the ratio (cache uses a 10 ns memory) is",
    "options": [
      "93%",
      "90%",
      "88%",
      "87%",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q55. If the main memory is of 8K bytes and the cache memory is of 2K words. It uses associative mapping. Then each word of cache memory shall be",
    "options": [
      "11 bits",
      "21 bits",
      "16 bits",
      "20 bits",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q56. A-Flip Flop can be converted into T -Flip Flop by using additional logic circuit",
    "options": [
      "n TQD =•",
      "T D =",
      "D = T . Q n",
      "n TQD =?",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q57. Once the ICW1 is loaded, then the in itialization procedure involves",
    "options": [
      "edge sense circuit is reset",
      "IMR is cleared",
      "slave mode address is set to 7",
      "all of the mentioned",
      "None of these"
    ],
    "correctIndex": 3,
    "explanation": "58.  (d) 59.  (a) 60.  (c)  9 Data Structure  1. Introduction  Data Structure is a systematic way to organize data in order to use it efficiently. Following  terms are the foundation terms of a data structure. • Interface − Each data structure has an interface. Interface represents the set of operations that a data structure supports. An interface only provides the list of supported operations, type of parameters they can accept and return type of these operations. • Implementation − Implementation provides the internal representation of a data structure.  Implementation also provides the definition of the algorithms used in the operations of the data structure.  2. Asymptotic Notation  Asymptotic analysis of an algorithm, refers to defining the mathematical boundation/framing of its run-time performance. Using asymptotic analysis, we can very well conclude the best case, average case and worst-case scenario of an algorithm.  When we study algorithms, we are interested in charact erizing them according to their efficiency. We are usually interested in the order of growth of the running time of an algorithm, not in the exact running time. This is also referred to as the asymptotic running time. We need to develop a way to talk about rate of growth of functions so that we can compare algorithms. Asymptotic notation gives us a method for classifying functions according to their rate of growth. Usually, time required by an algorithm falls under three types: 1. Best Case − Minimum time required for program execution. 2. Average Case − Average time required for program execution. 3. Worst Case − Maximum time required for program execution.  Following are commonly used asymptotic notations used in calculating running time complexity of an algorithm. • Ο Notation • Ω Notation • θ Notation  2.1 Big Oh Notation, Ο  Definition: Given a function g(n), we denote (g(n)) to be the set of functions { f(n) | there exists positive constants c and n0 such that 0 · f(n) · c g(n) for all n ¸ n0 }  i.e. (g(n)) includes all functions that are upper bounded by g(n)  We say that “f(n) is big-O of g(n).” As n increases, f(n) grows no faster than g(n). In other words, g(n) is an asymptotic upper bound on f(n).  Example: n2 + n = O(n3)  Proof: • Here, we have f(n) = n2 + n, and g(n) = n3 • Notice that if n ≥ 1, n ≤ n3 is clear. • Also, notice that if n ≥ 1, n2 ≤ n3 is clear. • In general, if a ≤ b, then na ≤ nb whenever n ≥ 1. This fact is used often in these types of proofs. • Therefore, n2 + n ≤ n3 + n3 = 2n3 • We have just shown that n2 + n ≤ 2n3 for all n ≥ 1 • Thus, we have shown that n2 + n = O(n3) (by definition of Big-O, with n0 = 1, and c = 2.)  The constant multiplier c is what allows functions that differ only in their largest coefficient to have the same asymptotic complexity  Example: g(n) = 7n+5 and f(n) = n − For any choice of n0, need a c > 7 (or more) to show g(n) is in O( f(n) )  2.2 Big-Ω notation  The Ωn is the formal way to express the lower bound of an algorithm's running time. It measures the best case time complexity or best amount of time an algorithm can possibly take to complete.  Definition: f(n) = Ω(g(n)) iff there are two positive constants c and n0 such that |f(n)| ≥ c |g(n)| for all n ≥ n0  • If f(n) is nonnegative, we can simplify the last condition to 0 ≤ c g(n) ≤ f(n) for all n ≥ n0 • We say that “f(n) is omega of g(n).” • As n increases, f(n) grows no slower than g(n). In other words, g(n) is an asymptotic lower bound on f(n). Ω (g(n)) includes all functions that are lower bounded by g(n)  Similar to Big-O, we will slightly change the notation, and write f(n) = Ω (g(n)) to mean f(n) 2 ∈ Ω (g(n)) Relationship between Big-O and Big- Ω: f(n) = Ω (g(n)) ⇔ g(n) = O(f(n))  Example: n3 + 4n2 = Ω(n2) Proof: • Here, we have f(n) = n3 + 4n2, and g(n) = n2 • It is not too hard to see that if n ≥ 0, n3 ≤ n3 + 4n2 • We have already seen that if n ≥ 1, n2 ≤ n3 • Thus, when n ≥ 1, n2 ≤ n3 ≤ n3 + 4n2 • Therefore,1n2 ≤ n3 + 4n2 for all n ≥ 1 • Thus, we have shown that n3 + 4n2 = Ω(n2) (by definition of Big-Ω, with n0 = 1, and c = 1.)  2.3 Big Theta Notation -Θ  Definition (Big–Theta, Θ()): Let f(n) and g(n) be functions that map positive integers to positive real numbers. We say that f(n) is Θ(g(n)) (or f(n) ∈ Θ(g(n))) if and only if f(n) ∈ O(g(n)) and f(n) ∈ Ω(g(n)).  f(n) = Θ(g(n)) iff there are three positive constants c1, c2 and n0 such that c1|g(n)| ≤ |f(n)| ≤ c2|g(n)| for all n ≥ n0  • If f(n) is nonnegative, we can simplify the last condition to 0 ≤ c1 g(n) ≤ f(n) ≤ c2 g(n) for all n ≥ n0 • We say that “f(n) is theta of g(n).” • As n increases, f(n) grows at the same rate as g(n). In other words, g(n) is an asymptotically tight bound on f(n).  f(n) = O(g(n)) ⇒ f ≤ g f(n) = Ω(g(n)) ⇒ f ≥g f(n) = Θ(g(n)) ⇒ f ≈ g • It is important to remember that a Big -O bound is only an upper bound . So, an algorithm that is O(n 2) might not ever take that much time. It may actually run in O(n) time. • Conversely, an Ω bound is only a lower bound. So an algorithm that is Ω(n log n) might actually be Θ(2n). • Unlike the other bounds, a Θ-bound is precise. So, if an algorithm is Θ(n2), it runs in quadratic time.  3. Arrays & Stack  Array is a container which can hold a fix number of items and these items should be of the same type. Most of the data structures make use of arrays to implement their algorithms.  Following are the important terms to understand the concept of Array. • Element − Each item stored in an array is called an element. • Index − Each location of an element in an array has a numerical index, which is used to identify the element.  Following are the basic operations supported by an array. • Traverse − print all the array elements one by one. • Insertion − Adds an element at the given index. • Deletion − Deletes an element at the given index. • Search − Searches an element using the given index or by the value. • Update − Updates an element at the given index.  Linked Lists Linked lists are a common alternative to arrays in the implementation of data structures. Each item in a linked list contains a data element of some type and a pointer to the next item in  the list. It is easy to insert and delete elements in a linked list, which is not a natural operation on arrays. On the other hand access to an element in the middle of the list is usually O(n), where n is the length of the list.  An item in a linked list consists of a struct containing the data element and a pointer to another linked list. This gives rise to the following definition: struct list { string data;  struct list* next; }; typedef struct list* list;  This definition is an example of a recursive type. A struct of this type contains a pointer to another struct of the same type, and so on. We usually use the special element of type t*, namely NULL, to indicate that we have reached the end of the list. Sometimes (as will be the case for queues intro duced next), we can avoid the explicit use of NULL and obtain more elegant code. The type definition is there to create the type name list, which stands for a pointer to a struct list.  A stack is a container of objects that are inserted and removed accord ing to the last-in first-out (LIFO) principle. In the pushdown stacks only two operations are allowed: push the item into the stack, and pop the item out of the stack. A stack is a lim ited access data structure - elements can be added and removed from the stack only at the top. push adds an item to the top of the stack, pop removes the item from the top. A helpful analogy is to think of a stack of books; you can remove only the top book, also you can add a new book on the top.  Basic Operations • push() − Pushing (storing) an element on the stack. • pop() − Removing (accessing) an element from the stack.  To use a stack efficiently, we need to check the status of stack as well. For the same purpose, the following functionality is added to stacks −  • peek() − get the top data element of the stack, without removing it. • isFull() − check if stack is full. • isEmpty() − check if stack is empty.  Algorithm for PUSH Operation begin procedure push: stack, data  if stack is full return null endif  top ← top + 1  stack[top] ← data  end procedure  Algorithm for Pop Operation begin procedure pop: stack  if stack is empty return null endif  data ← stack[top]  top ← top - 1  return data  end procedure  Stack Program using Linked List (in C)  Linked stack source code file (stack.c)  #include <stdio.h>  struct node { int data; struct node* next; };  /* init the stack */ void init(struct node* head) { head = NULL; }  /* push an element into stack */ struct node* push(struct node* head,int data) { struct node* tmp = (struct node*)malloc(sizeof(struct node)); if(tmp == NULL) { exit(0); } tmp->data = data; tmp->next = head; head = tmp; return head; } /* pop an element from the stack */ struct node* pop(struct node *head,int *element) { struct node* tmp = head; *element = head->data; head = head->next; free(tmp); return head; } /* returns 1 if the stack is empty, otherwise returns 0 */ int empty(struct node* head) { return head == NULL ? 1 : 0; }  /* display the stack content */ void display(struct node* head) { struct node *current; current = head; if(current!= NULL) { printf(\"Stack: \"); do { printf(\"%d \",current->data); current = current->next; } while (current!= NULL); printf(\"\\n\"); } else { printf(\"The Stack is empty\\n\"); }  }  Linked stack test program: #include <stdio.h>  #include \"linkedstack.h\"  int main() { struct node* head = NULL; int size, element; int counter = 0;  printf(\"Enter the number of stack elements:\"); scanf(\"%d\",&size);  printf(\"--- Push elements into the linked stack ---\\n\");  init(head);  while(counter < size) {  printf(\"Enter a number to push into the stack:\"); scanf(\"%d\",&element); head = push(head,element); display(head); counter++; }  printf(\"--- Pop elements from the linked stack --- \\n\"); while(empty(head) == 0) { head = pop(head,&element); printf(\"Pop %d from stack\\n\",element); display(head);"
  },
  {
    "question": "Q58. The signal that is applied to the decoding logic, to differentiate between interrupt, code fetch and data bus cycles is",
    "options": [
      "COD",
      "INTA (active low)",
      "M/IO (active low)",
      "all of the mentioned",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q59. ‘Aging registers’ are",
    "options": [
      "Counters which indicate how long ago their associated pages have been referenced.",
      "Registers which keep track of when the program was last accessed.",
      "Counters to keep track of last accessed instruction.",
      "Counters to keep track of the latest data structures referred.",
      "None of these"
    ],
    "correctIndex": 0,
    "explanation": "Correct answer based on professional knowledge concepts."
  },
  {
    "question": "Q60. SIMD represents an organization that __________.",
    "options": [
      "refers to a computer system capable of processing several programs at the same time.",
      "represents organization of single computer containing a control unit, processor unit and a memory unit.",
      "includes many processi ng units under the supervision of a common control unit",
      "none of the above.",
      "All",
      ",",
      "and",
      ""
    ],
    "correctIndex": 5,
    "explanation": "Correct answer based on professional knowledge concepts."
  }
]
```

---

