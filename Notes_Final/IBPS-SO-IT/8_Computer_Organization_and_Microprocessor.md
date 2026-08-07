# 8. Computer Organization & Microprocessor

---

### 1.5 Two’s Complement
Two’s complement is an encoding scheme that addresses the double 0 issue in signed magnitude and 1’s complement
representations. In this approach, the negative number is obtained by subtracting its positive equivalent from 2n. This
is identical to performing a c omplement on the positive equivalent and  then adding one. If a carry is generated, it is
discarded. This procedure is called “taking the two ’s complement of a number .” The procedure of complementing
each bit and adding one is the most  common technique to p erform a two ’s complement. In this way, the most
significant bit of the number is  still the sign bit (0 = positive, 1 = negative) but all of the negative numbers are i n
essence shifted up so that the double 0 gap is eliminated. Taking the two’s complement of a positive number will give
its negative counterpart and vice versa. Let’s look at the decimal values that a 4-bit, two’s complement
number can take on.

There ar e many advantages of two ’s complement encoding. First, there is no double 0 ga p, which means that all
possible 2n unique codes that can exist in an n -bit number are used. This gives the largest  possible range of numbers
that can be represented. Another adv antage of two ’s complement is that  addition with negative numbers works
exactly the same as decimal. In our example of ( -5) + (1), the  result is ( -4). Arithmetic circuitry can be built to mimic
the way our decimal arithmetic works without the  need to consi der the double 0 gap. Finally, the rollover
characteristic is preserved from one’s complement. Incrementing +7 by +1 will result in -8.
The process of finding the decimal value of a two ’s complement number involves first identifying  whether the
number is p ositive or negative by looking at the sign bit. If the number is positive (i.e., the  sign bit is 0), then the
number is treated as an unsigned code and is converted to decimal using the  standard conversion procedure
described in prior sections. If the numb er is negative (i.e., the sign bit is 1), then the number sign  is recorded
separately and a two ’s complement is performed on the code in order to convert it to its positive magnitude
equivalent. This new positive number is then converted to decimal using t he standard conversion procedure. The
final step is to apply the sign.

To convert a decimal number into its two ’s complement code, the range is first checked to determine whether the
number can be represented with the allocated number of bits. The next step is to convert the decimal number into
unsigned binary. The final step is to apply the sign bit. If the original decimal number was positive, the n the
conversion is complete. If the original decimal number was negative, then the two ’s complement is tak en on the
unsigned binary code to find its negative equivalent.

1.6. Fixed Point Notation
Fixed Point Notation is a representation of our fractional number as it is stored in memory.  In Fixed Point Notation,
the number is stored as a signed integer in two’s complement format.

On top of this, we apply a notional split, locating the radix point (the separator between integer and fractional parts) a
fixed number of bits to the left of its notational starting position to the right of the least significant bit. We’ve illustrated
this in the diagram below.

When we interpret the bits of the signed integer stored in memory we reposition the radix point by multiplying the
stored integer by a fixed scaling factor.  The scaling factor in binary is always 2 raised to a fixed exponent.  As the
scaling factor is a power of 2 it relocates the radix point some number of places to the left or right of its startin g
position.
During this conversion, there are three directions that the radix point can be moved:

- The radix point is moved to the right: This is represented by a scaling factor whose exponent is 1 or more.  In this
case additional zeros are appended to the right of the least-significant bit and means that the actual number being
represented is larger than the binary integer that was stored.

- The radix point remains where it is: This is represented by a scaling factor whose exponent is 0 and means that the
integer value stored is exactly the same as the integer value being represented.

- The radix point is moved to the left:  This is represented by a scaling factor whose exponent is negative.  This
means that the number being represented is smaller than the integ er number that was stored and means  that the
number being represented has a fractional component.
Let’s take a look at a couple of examples.

Examples of Fixed Point Numbers
Lets assume we have an 8-bit signed binary number 000110112 that is stored in memory using 8-bits of storage (hence
the leading zeros).
In our first scenario, lets also assume this number was stored as a signed fixed-point representation with a scale factor
of 22.
As our scale factor is greater than 1, when we translated the bits stored  in memory into the number we are
representing, we move the radix point two places to the right.  This gives us the number: 11011002 (Note the additional
zeros that are appended to the right of the least significant bit).

In our second scenario, let us as sume that we start off with the same binary number in memory but this time we’ll
assume that it is stored as a signed fixed-point representation with a scale factor of 2-3.  As the exponent is negative we
move the radix point three places to the left.  This gives us the number 00011.0112

Advantages and Disadvantages of Fixed Point Representation

The major advantage of using a fixed -point representation is performance.  As the value stored in memory is an
integer the CPU can take advantage of many of the o ptimizations that modern computers have to perform integer
arithmetic without having to rely on additional hardware or software logic. This in turn can lead to increases in
performance and when writing your apps, can therefore lead to an improved experience for your users.
However, there is a downside!  Fixed Point Representations have a relatively limited range of values that they can
represent.

So how do we work out the maxim um and minimum numbers that can be stored in a fixed -point representation and
determine whether it is suitable for our needs?  All we do is take the largest and smallest integer values that can be
stored in the given number of bits and multiply that by the  scale factor associated with our fixed -point
representation.  For a given signe d binary number using  b bits of storage with a scale factor of  f the maximum and
minimum values that can be stored are:
Minimum: −2b−1/2f
Maximum: (2b−1−1)/2f

If the number you want to represent fits into this range then things are great.  If it doesn’t though, you have to look for
an alternative!  This is where Floating Point Notation comes in.

### 1.7 Floating Point Notation

Floating Point Notation  is an alternative to the Fixed-Point notation and is the representation that most modern
computers use when storing fractional numbers in memory.  Floating Point Notation is a way to represent very large
or very small numbers pre cisely using scientific notation in binary.  In doing so, Float ing Point Representation
provides a varying degree of precision depending on the scale of the numbers that you are using.

For example, the level of precision we need when we are talking about the distance between atoms (10 -10 m) is very
different from the  precision we need when we’re talking about the distance between the earth and the sun
(1011 m).  This is a major benefit and allows a much wider range of numbers to be represented than is possible in Fixed
Point Notation. Floating Point Representation is based on Scientific Notation.  You may have used Scientific Notation
in school. When we use Scientific Notation in decimal (the form you’re probably most familiar with), we write numbers
in the following form:
+/- mantissa x 10exponent

In this form, there  is an optional sign indicating whether the overall number is positive or negative, followed by a
mantissa (also known as a significand) which is a real (fractional) number which in turn is multiplied by a number base
(or radix) raised by an exponent. As we know, in decimal this number base is 10.
Floating Point Representation is essentially Scientific Notation applied to binary numbers.  In binary, the only real
difference is that the number ba se is 2 instead of 10.  We would therefore write Floating Point  Numbers in the
following form:
+/- mantissa x 2exponent

Now, you may not have realised it but when we write numbers in scientific notation (whether they be binary or
decimal) we can write them in a number of different ways.

In decimal, we could write 1.5 x 102, 15 x 101 and 150 x 100 and yet all these numbers have exactly the same value.
This provides flexibility but with this flexibility also comes confusion.  To try and address this confusion a common set
of rules known as normalized scientific notation are used to define how numbers in scientific notation are normally
written.

In the coding, when numbers, letters or words are represented by a specific group of symbols, it is said that the
number, letter or word is being encoded. The group of symbols is called as a code. The digital data is represented,
stored and transmitted as group of binary bits. This group is also called as binary code. The binary code is represented
by the number as well as alphanumeric letter.

Following is the list of advantages that binary code offers. Binary codes are suitable for the computer applications.

- Binary codes are suitable for the digital communications.

- Binary codes make the analysis and designing of digital circuits if we use the binary codes.

- Since only 0 & 1 are being used, implementation becomes easy.

### 1.8 Classification of Binary Codes
The codes are broadly categorized into following four categories.

- **Weighted Codes** — Non-Weighted Codes

- **Binary Coded Decimal Code** — Alphanumeric Codes

- **Error Detecting Codes** — Error Correcting Codes

Weighted Codes
Weighted binary codes are thos e binary codes which obey the positional weight principle. Each position of the
number represents a specific weight. Several systems of the codes are used to express the decimal digits 0 through 9.
In these codes, each decimal digit is represented by a group of four bits.

Non-Weighted Codes
In this type of binary codes, the positional weights are not assigned. The examples of non-weighted codes are Excess-3
code and Gray code.

Excess-3 code
The Excess-3 code is also called as XS-3 code. It is non-weighted code used to express decimal numbers. The Excess-3
code words are derived from the 8421 BCD code word s adding W112 or 3 10 to each code word in 8421. The excess -3
codes are obtained as follows –

Add
0011Decimal Number 8421 BCD Excess 3⎯⎯ → ⎯⎯⎯ → −

Example
Decimal BCD Excess-3
8 4 2 1 BCD+0011
0 0 0 0 0 0 0 1 1
1 0 0 0 1 0 1 0 0
2 0 0 1 0 0 1 0 1
3 0 0 1 1 0 1 1 0
4 0 1 0 0 0 1 1 1
5 0 1 0 1 1 0 0 0
6 0 1 1 0 1 0 0 1
7 0 1 1 1 1 0 1 0
8 1 0 0 0 1 0 1 1
9 1 0 0 1 1 1 0 0

Gray Code
It is the non-weighted code and it is not arithmetic codes. That means there are no specific weigh t assigned to the bit
position. It has a very special feature that only one bit will change each time the decimal number is incremented as
shown in fig. As only one bit changes at a time, the gray code is called as a unit distance code. The gray code is a cyclic
code. Gray code cannot be used for arithmetic operation.

Decimal BCD Gray
0 0 0 0 0 0 0 0 0
1 0 0 0 1 0 0 0 1
2 0 0 1 0 0 0 1 1
3 0 0 1 1 0 0 1 0
4 0 1 0 0 0 1 1 0
5 0 1 0 1 0 1 1 1
6 0 1 1 0 0 1 0 1
7 0 1 1 1 0 1 0 0
8 1 0 0 0 1 1 0 0
9 1 0 0 1 1 1 0 1

Application of Gray code

- Gray code is popularly used in the shaft position encoders.

- A shaft position encoder produces a code word which represents the angular position of the shaft.

Binary Coded Decimal BCD code
In this code, each decimal digit Is represented by a 4-bit binary number. BCD is a way to express each of the decimal
digits with a binary code. In the BCD, with four bits we can represent sixteen numbers 0000  to 1111. But in BCD code
only first ten of these are used 00000 to 1001. The remaining six code combinations i.e. 1010 to 1111 are invalid in BCD.
Decimal 0 1 2 3 4 5 6 7 8 9
BCD 0000 0001 0010 0011 0100 0101 0110 0111 1000 1001

Advantages of BCD Codes

- It is very similar to decimal system.

- We need to remember binary equivalent of decimal numbers 0 to 9 only.

Disadvantages of BCD Codes

- The addition and subtraction of BCD have different rules.

- The BCD arithmetic is little more complicated.

- BCD needs more number of bits than binary to represent the decimal number. So, BCD is less efficient than binary.

## 2. General Register Organization

Memory access is very time -consuming, especially on today's computers, which typically have many wait-states.
Compounding the technological limitations on memory speed is the fact than RAM memory banks are getting bigger.

Bigger memory units mean longer propagation delays in decoding the address.  Memory access is also expensive in
terms of the instruction code size necessary to accommodate 32 or 64-bit addresses.

If many CPU registers are available for heavi ly used variables and intermediate results, we can avoid memory
references much of the time, thus vastly increasing program execution speed, and reducing program size.

In a general -register organization such as this one, any two registers can be inputs to  the ALU, and the results from
the ALU can be stored in any register. When all registers are interchangeable, the architecture is  orthogonal,
or symmetric. An orthogonal processor is ideal for programmers, because they can use any register for any purpose.
This is the other end of the spectrum from an accumulator-based architecture.

The Control Word
Is the binary word formed by the selections in the general register organization

It has 14 bits, 3 bits for SELA, 3 bits for SELB, 3 bits for SELD, and 5 bits for OPR
Number of bits 3 3 3 5
Field SELA SELB SELD OPR

Control Word (CW)
Control word is defined as a word whose individual bits represent the various control signal. Therefore, each of the
control steps in the control sequence of an instruction defines a unique combination of 0s and 1s in the CW.
A sequence of control words (CWs) correspondin g to the control sequence of a machine instruction constitutes the
micro program for that instruction.

The individual control words in this micro-program are referred to as micro instructions.
The micro programs corresponding to the instruction set  of a computer are stored in a  special memory which will be
referred to as the micro -program memory. The control words related to an instruction are stored in micro -program
memory.

## 3. Micro programmed Control

In hardwired control, we saw how all the control  signals required inside the CPU can be generated using a state
counter and a PLA circuit.
There is an alternative approach by which the control signals required ins ide the CPU can be generated. This
alternative approach is known as micro programmed control unit. In micro programmed control unit, the logic of the
control unit is specified by a micro program.
A microprogram consists of a sequence of instructions in a m icroprogramming language. These are instructions that
specify microoperations.

A microprogrammed control unit is a relatively simple logic circuit that is capable of (1) sequencing through micro
instructions and (2) generating control signals to execute each microinstruction.
The concept of micro program is similar to computer program. In compu ter program the complete instructions of the
program is stored in main memory and during execution it fetches the instructions from main memory one after
another. The sequence of instruction fetch is controlled by program counter (PC).

Microprogram are stored in microprogram memory and the execution is controlled by microprogram counter (PC).

### 3.1 Basic Concepts of Microprogramming

- Control word (CW):
A word with each bit for one of the control signals. Each step of the instruction execution is represented by a
control word with all of the bits corresponding to the control signals needed for the step set to one.

- Microinstruction:
Each step in a sequence of steps in the execution of a certain machine instruction is considered as
a microinstruction, and it is represented by a control word. All of the bits corresponding to the control signals
that need to be asserted in this step are set to 1, and all others are set to 0 (horizontal organization).

- Microprogram:
Composed of a sequence of microinstruct ions corresponding to the sequence of steps in the execution of a
given machine instruction.

- Microprogramming:
The method of generating the control signals by properly setting the individual bits in a control word of a step.

Micro-programmed Control Unit –

- The control signals associated with operations are stored in special memory units inaccessible by the
programmer as Control Words.

- Control signals are generated by a program are similar to machine language programs.

- **Micro** — programmed control unit is slower in speed because of the time it takes to fetch micro instructions from
the control memory.

Some Important Terms –
1. Control Word : A control word is a word whose individual bits represent various control signals.
2. Micro-routine: A sequence of control words corresponding to the control sequence of a machine instruction
constitutes the micro-routine for that instruction.
3. Micro-instruction: Individual control words in this micro-routine are referred to as micro instructions.
4. Micro-program: A sequence of micro -instructions is called a micro -program, which is stored in a ROM or
RAM called a Control Memory (CM).
5. Control Store: the micro-routines for all instructions in the instruction set of a computer are stored in a special
memory called the Control Store.

### 3.2 Hardwired Control Unit

The control hardware can be viewed as a state machine that changes from one state to another in every clock cycle,
depending on the contents of the instr uction register, the condition codes and the external inputs. The  outputs of the
state machine are the control signals. The sequence of the operation carried out by this machine is determined by the
wiring of the logic elements and hence named as “hardwired”.

- Fixed logic circuits that correspond directly to the Boolean expressions are used to generate the control signals.

- **Hardwired control is faster than micro** — programmed control.

- A controller that uses this approach can operate at high speed.

### 3.3 Control address register

Control memory address register specifies the address of the micro-instruction, and the control data register holds the
micro-instruction read from memory, The micro-instruction contains a control word that specifies one or more micro
operations for the data processor. Once these operati ons are executed, the control must determine the next address.
The location of the next micro-instruction may be the one next in sequence, or it may be located somewhere else in the
control memory for thi s reason it is necessary to use some bits of the pre sent micro -instruction to control the
generation of the address of the next micro -instruction. The next address may also be a function of the external input
condition.

## 4. Instruction Pipeline

Instruction p ipelining is a  technique used in the design of modern microprocessors, microcontrollers and CPUs to
increase their instruction throughput (the number of instructions that can be executed in a unit of time).

Most modern CPUs are driven by a clock. The CPU consists internally of logic and memory (flip flops). When the clock
signal arrives, the flip flops store their new value then the logic requires a period of time to dec ode the flip flops new
values. Then the next clock pulse arrives and the flip flops store another values, and so on. By breaking the logic into
smaller pieces and inserting flip flops between pieces of logic, the time required by th e logic (to decode values till
generating valid outputs depending on these values) is reduced. In this way the clock period can be reduced.
For example, the RISC pipeline is broken into five stages with a set of flip flops between each stage as follow:
## 1. Instruction fetch
## 2. Instruction decode and register fetch
## 3. Execute
## 4. Memory access
## 5. Register write back

Pipelining can occur in the data stream and the instruction stream.
In the most general case, an instruction cycle can be broken into the following stages:
## 1. Fetch instruction from memory
## 2. Decode instruction
## 3. Calculate effective address(es)
## 4. Fetch operand(s)
## 5. Execute instruction
## 6. Store result

Each stage can be performed more or less independently from the rest.
A queue made of up a small number of registers in the CPU can be filled by the instruction fetch stage while other
stages are working on previously fetched instructions. The instruction fetch hardware can prefetch instructions
whenever there is space in the queue and memory is not being used for other purposes (fetching operands or storing
results).

## 5. Memory Organization

A memory unit is the collection of storage units or devices together. The memory unit stores the binary information in
the form of bits. Generally, memory/storage is classified into 2 categories:

- Volatile Memory: This loses its data, when power is switched off.

- **Non** — Volatile Memory: This is a permanent storage and does not lose any data when power is switched off.

### 5.1 Memory Hierarchy

The total memory capacity of a computer can be visualized by hierarchy of components. The memory hierarchy
system consists of all storage devices contained in a comp uter system from the slow Auxiliary Memory to fast Main
Memory and to smaller Cache memory.

Memory devices in computers can be grouped depending on their access time and their "distance" from the processor
(more precisely from the arithmetical-logical unit and control unit), which means the number of elementary transfers
when data (instruc tions) are fetched. The groups have similar parameters such as access time, cycle time, volume,
information storage cost per bit. The so defined g roups can be set in the order which corresponds to direct mutual
access between neighbouring elements, in a Ca rtesian coordinate system, where the vertical axis corresponds to the
memory speed and access time and the horizontal axis corresponds to memory v olume and the data storing cost per
bit.

### 5.2 Primary and Auxiliary Memory

Main memory unit is the storage unit, there are several locations for storing information in the main memory module.
The main memory stores instructions and data of the currently  executed programs. Usually it is a random -access
memory RAM with reads and writes available. Sometimes, its p art can be implemented as the fixed memory or
read-only memory ROM. The capacity of a memory module is specified by the number of memory location and the
information stored in each location.

A memory module of capacity 16 X 4 indicates that, there are 16 locations in the memory module and in each location,
we can store 4 bits of information.
We need two operations to work with memory.

- READ Operation: This operation is to retrieve the data from memory and bring it to CPU register

- WRITE Operation: This operation is to store the data to a memory location from CPU register

A main memory can be built of a single or many memory modules. A main m emory module is built of an address
decoder and a set of memory locations. The locations store words of bits of data a ssigned to consecutive addresses.
The word can contain any, but fixed for a given computer, number of bits. There can be several word form ats
available in the same computer. Usually, the words are so defined as to contain an integer number of bytes. To sto re
one bit of information, a bit cell is used in main memory.

Organization structures of main memories can be divided, according to the circuit that selects memory locations, into
the following types:

- Main memory with linear selection (with a single address decoder)

- **Main memory with two** — dimensional selection (with two address decoders)

- Main memory with linear selection of multiple words (with a single address decoder and a selector)

Random-Access Memory
Random-access memory (RAM) comes in two varieties —static and dynamic. Static RAM (SRAM) is faster and
significantly more expensive than Dynamic RAM (DRAM). SRAM is used for cache memories, both on and off the
CPU chip. DRAM is used for the main memory plus the frame buffer of a graphics system. Typically, a desktop
system will have no more than a few megabytes of SRAM, but hundreds or thousands of megabytes of DRAM.

Static RAM
SRAM stores each bit in a bi-stable memory cell. Each cell is implemented with a six-transistor circuit. This circuit has
the property that it can stay indefinitely in either of two different voltage configurations, or states. Any other state will
be unstable—starting from there, the circuit will quickly move toward one of the stable states.
Due to its bi-stable nature, an SRAM memory cell will retain its value indefinitely, as long as it is kept powered. Even
when a disturbance, such as electrical noise, perturbs the voltages, the circuit will return to the stable value when the
disturbance is removed.

Dynamic RAM
DRAM stores each b it as charge on a capacitor. This capacitor is very small.  DRAM storage can be made very
dense—each cell consists of a capacitor and a single access-transistor. Unlike SRAM, however, a DRAM memory cell
is very sensitive to any disturbance. When the capaci tor voltage is disturbed, it will never recover. Exposure to light
rays will cause the capacitor voltages to change. In fact, the sensor s in digital cameras and camcorders are essentially
arrays of DRAM cells. Various sources of leakage current cause a DRAM cell to lose its charge within a time period of
around 10 to 100 milliseconds. Fortunately, for computers operating with clock cycles times measured in
nanoseconds, this retention time is quite long. The memory system must periodically refresh every bit of memory by
reading it out and then rewriting it. Some systems also use error -correcting codes, where the computer words are
encoded a few more bits (e.g., a 32-bit word might be encoded using 38 bits), such that circuitry can detect and correct
any single erroneous bit within a word.)

SRAM is persistent as long as power is applied to them. Unlike DRAM, no refresh is necessary. SRAM can be accessed
faster than DRAM. SRAM is not sensitive to disturbances such as light and electrical noise. The trade-off is that SRAM
cells use more transistors than DRAM cells, and thus have lower densities, are more expensive, and consume more
power.

Conventional DRAMs
The cells (bits) in a DRAM chip are partitioned into d supercells, each consisting of w DRAM cells. A d × w DRAM
stores a total of dw bits of information. The supercells are organized as a rectangular array with r rows and c columns,
where rc = d. Each supercell has an address of the form (i,j), where i denotes the row, and j denotes the column.

For example, consider the organization of a 16 × 8 DRAM chip with d = 16 supercells, w = 8bits per supercell, r = 4
rows, and c = 4 columns. The shaded box denotes the supercell at address (2, 1). Information flows in and out of the
chip via external connectors called pins. Each pin carries a 1-bit signal.

RAS and CAS Request:
Each DRAM chip is connected to some circuitry, known as the memory controller, that can transfer w bits at a time to
and from each DRAM chip. To read the contents of supercell (i,j), the memory controller sends the row address i to
the DRAM, followed by the column address j. The DRAM responds by sending the contents of super cell (i,j) back to

the controller. The row address i is called a RAS (Row Access Strobe) request. The column address j is ca lled a CAS
(Column Access Strobe) request. Notice that the RAS and CAS requests share the same DRAM address pins.

Memory Modules: DRAM chips are packaged in memory modules that plug into expansion slots on the main system
board (motherboard). Common packa ges include the 168 -pin dual inline memory module (DIMM), which transfers
data to and from the memory controller in 64-bit chunks, and the 72-pin single inline memory module (SIMM), which
transfers data in 32-bit chunks.

Enhanced DRAMs
There are many kind s of DRAM memories, and new kinds appear on the market with regularity as manufacturers
attempt to keep up with rapidly increasing processor speeds.

- Fast page mode DRAM (FPM DRAM): A conventional DRAM copies an entire row of supercells into its internal
row buffer, uses one, and then discards the rest. FPM DRAM improves on this by allowing consecutive accesses to
the same row to be served directly from the row buffer.

- Extended data out DRAM (EDO DRAM):  An enhanced form of FPM DRAM that allows the individual  CAS
signals to be spaced closer together in time.

- Synchronous DRAM (SDRAM): Conventional, FPM, and EDO DRAMs are asynch ronous in the sense that they
communicate with the memory controller using a set of explicit control signals. SDRAM replaces many of the se
control signals with the rising edges of the same external clock signal that drives the memory controller. Without
going into detail, the net effect is that an SDRAM can output he contents of its supercells at a faster rate than its
asynchronous counterparts.

- **Double Data ** — Rate Synchronous DRAM (DDR SDRAM):  DDR SDRAM is an enhancement of SDRAM that
doubles the speed of the DRAM by using both clock edges as control signals. Different types of DDR SDRAMs are
characterized by the size of a small prefetch buff er that increases the effective bandwidth: DDR (2 bits), DDR2 (4
bits), and DDR3 (8 bits).

- Rambus DRAM (RDRAM):  This is an alternative proprietary technology with a higher maximum bandwidth
than DDR SDRAM.

- Video RAM (VRAM): Used in the frame buffers of gra phics systems. VRAM is similar in spirit to FPM DRAM.
Two major differences are that (1) VRAM output is produced by shif ting the entire contents of the internal buffer
in sequence, and (2) VRAM allows concurrent reads and writes to the memory. Thus, the sy stem can be painting
the screen with the pixels in the frame buffer (reads) while concurrently writing new values for th e next update
(writes).

Non-volatile Memory
This category of memory retains the information even when they are powered off. There are a  variety of non-volatile
memories. For historical reasons, they are referred to collectively as read-only memories (ROMs), even though some
types of ROMs can be written to as well as read. ROMs are distinguished by the number of times they can be
reprogrammed (written to) and by the mechanism for reprogramming them.

A programmable ROM (PROM) can be programmed exactly once.  PROMs include a sort of fuse with each memory
cell that can be blown once by zapping it with a high current. An erasable programmable R OM ( EPROM) has a
transparent quartz window that permits light to reach the storage cells. The EPROM cells are cleared to  zeros by
shining ultraviolet light through the window. Programming an EPROM is done by using a special device to write
ones into the EPROM. An EPROM can be erased and reprogrammed on the order of 1000 times.

An electrically erasable PROM (EEPROM) is aki n to an EPROM, but does not require a physically separate
programming device, and thus can be reprogrammed in -place on printed circuit c ards. An EEPROM can be
reprogrammed on the order of 105 times before it wears out.

Flash memory is a type of non-volatile memory, based on EEPROMs, that has become an important storage
technology. Flash memories are everywhere, providing fast and durable non-volatile storage for a slew of electronic
devices, including digital cameras, cell phones, music players, PDAs, and laptop, desktop, and server computer
systems.

Programs stored in ROM devices are often referred to as firmware. When a computer system is powered up, it runs
firmware stored in a ROM. Some systems provide a small set of primitive input and output functions in firmware, for
example, a PC’s BIOS (basic input/output system) routines.  Complicated devices such as graphics cards and disk
drive controllers also rely on firmware to translate I/O (input/output) requests from the CPU.

Secondary Memory/Auxiliary Memory
Also termed as ‘auxiliary’ or ‘backup’ storage, it is typically used as a supplement to main storage. It is much cheaper
than the main storage and stores large amount of data and instructions permanently. Hardware devices like magnetic
tapes and disks fall under this category.

Magnetic Disk
The Magnetic Disk is Flat, circular platter with metallic coating that is rotated beneath read /write heads. It is a
Random access device; read/write head can be moved to any location on the platter.

Floppy Disk
These were small removable disks that are plastic coated with magnetic recording material. Floppy disks were
typically 3.5″ in size (diame ter) and could hold 1.44 MB of data (their use has been discontinued). This portable
storage device is a rewritable media and can be reused a number of times.

HARD DISK
Another form of auxiliary storage is a hard disk. A hard disk consists of one or more rigid metal plates coated with a
metal oxide material that allows data to be magnetically recorded on the surface of the platters. The hard disk platters
spin at a high rate of speed, typically 5400 to 7200 revolutions per minute (RPM). Storage capacities of hard disks for
personal computers range from 10 GB to 120 GB (one billion bytes are called a gigabyte).

Optical Disks: CD-R Drive, CD-RW disks, DVD, Blue ray Discs
Optical Mass Storage Devices Store bit values as variations in light reflection. They have higher area density & longer
data life than magnetic storage. They are also Standardized and r elatively inexpensive. Their Uses: read-only storage
with low performance requirements, applications with high capacity requirements & where portability in a
standardized format is needed.

Their Types:
– CD-ROM (read only)
– CD-R: (record) to a CD
– CD-RW: can write and erase CD to reuse it (re-writable)
– DVD (Digital Video Disk)

Blu-ray Technology
The name is derived from the blue -violet laser used to read and write data. It was developed by the Blu -ray Disc
Association with more than 180 members. Some companies with the technology are Dell, Sony, LG. The Data capacity
is very large because Blu-ray uses a blue laser (405 nanometres) instead of a red laser(650 nanometres) this allows the
data tracks on the disc to be very compact. This allows for more tha n twice as small pits as on a DVD. Because of the
greatly compact data Blu-ray can hold almost 5 times more data than a single layer DVD.

The Variations in the formats are as follows:

- **BD-ROM (read-only) - for pre** — recorded content

- **BD-R (recordable) - for PC data storage** — BD-RW (rewritable) - for PC data storage

- **BD-RE (rewritable) ** — for HDTV recording

Pen Drive: A flash drive consists of a small printed circuit board carrying the circuit elements and a USB connector,
insulated electrically and protected inside a plastic, metal, or rubberized case which can be carried in a pocket or on a
key chain, for example; the USB connector may be protected by a removable cap or by retracting into the body of the
drive, although it is not likely to be damaged if unprotected. Most flash drives use a standard type-A USB connection
allowing plugging into a port on a personal computer, but drives for other interfaces also exist.
USB flash drives draw power from the computer via the USB connection. Some devices combine the functionality of a
digital audio player with USB flash storage; they require a battery only when used to play music.

### 5.3 Cache Memory Organization

Cache Memory is a fast random access memory where the computer hardwar e stores copies of information currently
used by programs (data and instructions), loaded from the main memory. The cache has a significantly shorter access
time than the main memory due to the applied faster but more expensive implementation technology. The cache has a

limited volume that also results f rom the properties of the applied technology. If information fetched to the cache
memory is used again, the access time to it will be much shorter than in the case if this information were stored in the
main memory and the program will execute faster.

Time efficiency of using cache memories results from the locality of access to data that is observed during program
execution. We observe here time and space locality:

- Time locality  consists in a tendency to us e many times the same instructions and data in pr ograms during
neighbouring time intervals,

- Space locality is a tendency to store instructions and data used in a program in short distances of time under
neighbouring addresses in the main memory.

Due to th ese localities, the information loaded to the cac he memory is used several times and the execution time of
programs is much reduced. Cache can be implemented as a multi -level memory. Contemporary computers usually
have two levels of caches. In older comput er models, a cache memory was installed outside a  processor (in separate
integrated circuits than the processor itself). The access to it was organized over the processor external system bus. In
today's computers, the first level of the cache memory is ins talled in the same integrated circuit as the proc essor. It
significantly speeds up processor's co-operation with the cache. Some microprocessors have the second level of cache
memory placed also in the processor's integrated circuit. The volume of the firs t level cache memory is from several
thousands to  several tens of thousands of bytes. The second level cache memory has volume of several hundred
thousand bytes. A cache memory is maintained by a special processor subsystem called cache controller.

If there is a cache memory in a computer system, then at each access to a main memory address in order to fetch data
or instructions, processor hardware sends the address first to the cache memory. The cache control unit checks if the
requested information resid es in the cache. If so, we have a "hit" and the r equested information is fetched from the
cache.

Read implementation in cache memory on hit

If the requested information does not reside in the cache, we have a "miss" and the necessary information is fetched
from the main memory to the cache and to the requesting processor unit. The information is not copied in the cache as
single words but as a larger block of a fixed volume. Together with information block, a part of the address of the
beginning of the block is always copied into the cache. This part of the address is next used at readout during
identification of the proper information block.

Read implementation in cache memory on miss

If there are two cache levels, then on "miss" at the first level, the address is transferred in a hardwired way to the cache
at the second level. If at this level a "hit" happens, the block that contains the requested word is fetched from the
second level cache to the first level cache. If a "miss" occ urs also at the second cache level, the blocks containing the
requested word are fetched to the cache memories at both levels. The size of the cache block at the first level is from 8
to several tens of bytes (a number must be a power of 2). The size of th e block in the second level cache is many times
larger than the size of the block at the first level.

### 5.4 Cache Mapping

Cache Mapping is necessary as there are far fewer number of available cache addresses than the memory. Cache
mapping used to assign main memory address to cache address and determine hit or miss. Caches are partitioned into
indivisible blocks or lines of adjacent memory addresses usually 4 or 8 addresses per line.
There are three basic methods used for mapping of information fetched from the main memory to the cache memory:

- **associative mapping** — direct mapping

- **set** — associative mapping

Cache memory with direct mapping
The simplest way of associating main memory blocks with cache block is the direct mapping technique. In this
technique, block k of main memory maps into block k modulo m of the cache, where m is the total number of blocks
in cache. In this example, the value of m is 128. In direct mapping technique, one particular block of main memory can
be transferred to a particular block of cache which is derived by the modulo function.
Since more than on e main memory block is mapped onto a given cache block position, contention may arise for that
position. This situation may occur even when the cache is not full. Contention i s resolved by allowing the new block
to overwrite the currently resident block. So, the replacement algorithm is trivial.
The detail operation of direct mapping technique is as follows:

- The main memory address is divided into three fields. The field size depends on the memory capacity and the
block size of cache. In this example, the lower 5 bits of address is used to identify a word within a block. Next
7 bits are used to select a block out of 128 blocks (which is the capacity of the cache). The remaining  4 bits are
used as a TAG to identify the proper block of main memory that is mapped to cache.

- When a new block is first brought into the cache, the high order 4 bits of the main memory address are stored
in four TAG bits associated with its location in the cache. When the CPU generates a memory request, the
7-bit block address determines the corresponding cache block. The TAG field of that block is compared to the
TAG field of the address. If they match, the desired word specified by the low-order 5 bits of the address is in
that block of the cache.

- If there is no match, the required w ord must be accessed from the main memory, that is, the contents of that
block of the cache is replaced by the new block that is specified by the new address generated by the CPU and
correspondingly the TAG bit will also be changed by the high order 4 bits of the address.

Cache memory with associative mapping
With the associative mapping of the contents of cache memory, the address of a word in the main memory i s divided
into two parts: the tag and the byte index (offset). Information is fetched into the cache in blocks. The byte index
determines the location of the byte in the block whose address is generated from the tag bits, which are extended by
zeros in the  index part (it corresponds to the address of the first byte in the block. In the number of bit s in the byte
index is n then the size of the block is a power of 2 with the exponent n. The cache is divided into lines. In each line
one block can be written together with its tag and usually some control bits.

The principle of the read operation in cache memory is shown below. The requested address contains the tag (bbbbb)
and the byte index in the block (X). The tag is compared in parallel with all tags writ ten down in all lines. If a tag
match is found in a line, we have a hit and the line contains t he requested information block. Then, based on the byte
index, the requested byte is selected in the block and read out into the processor. If none of the lines contains the
requested tag, the requested block does not reside in the cache. The missing block  is next fetched from the main
memory or an upper level cache memory.

Cache memory with set associative mapping
This mapping technique is intermediate to the previous two techniques. Blocks of the cache are grouped into sets, and
the mapping allows a bloc k of main memory to reside in any block of a specific set. Therefore, the flexibity of
associative mapping is reduced from full freedom to a set of specific blocks. This also reduces the searching overhead,
because the search is restricted to number of set s, instead of number of blocks. Also, the contention problem of the
direct mapping is eased by having a few choices for block replacement.
Consider the same cache memory and main memory organization of the previous example. Organize the cache with 4
blocks in each set. The TAG field of associative mapping technique is divided into two groups, one is termed as SET
bit and the second one is termed as TAG bit. Each s et contains 4 blocks, total number of set is 32. The main memory
address is grouped into three parts: low-order 5 bits are used to identifies a word within a block. Since there are total
32 sets present, next 5 bits are used to identify the set. High-order 6 bits are used as TAG bits.
The 5-bit set field of the address determines which set of the ca che might contain the desired block. This is similar to
direct mapping technique, in case of direct mapping, it looks for block, but in case of block-set-associative mapping, it
looks for set. The TAG field of the address must then be compared with the TAG s of the four blocks of that set. If a
match occurs, then the block is present in the cache; otherwise the block containing the addressed word must be
brought to the cache. This block will potentially come to the corresponding set only. Since, there are four blocks in the
set, we have to choose appropriately which block to be replaced if all the blocks are occupied. Since the search is
restricted to four block only, so the searching complexity is reduced.

Set Associated Mapping Cache with 4 blocks per set

5.5. Virtual Memory

In early computers, freedom of programming was seriously restricted by a limited volume of main memory
comparing program sizes. Small main memory volume was making large programs execution very troublesome and
did not enable flexible  maintenance of memory space in the case of many co -existing programs. It was very
uncomfortable, since programmers were forced to spend much time on designi ng a correct scheme for data and code
distribution among the main memory and auxiliary store. The s olution to this problem was supplied by introduction
of the virtual memory concept. This concept was introduced at the beginning of years 1970 under the name  of
one-level storage in the British computer called Atlas. Only much later, together with applicat ion of this idea in
computers of the IBM Series 370, the term virtual memory was introduced.

Virtual memory provides a computer programmer with an addressin g space many times larger than the physically
available addressing space of the main memory. Data a nd instructions are placed in this space with the use of virtual
addresses, which can be treated as artificial in some way. In the reality, data and instruct ions are stored both in the
main memory and in the auxiliary memory (usually disk memory). It is do ne under supervision of the virtual
memory control system that governs real current placement of data determined by virtual addresses. This system
automatically (i.e. without any programmer's actions) fetches to the main memory data and instructions requested by
currently executed programs.

Physical and Virtual Addressing
The main memory of a computer system is organized as an array of M contiguous byte -sized cells. Each byte has a
unique physical address (PA). The first byte has an address of 0, the ne xt byte an address of 1, the next byte an
address of 2, and so on. Given this simple organization, the most natural way for a CPU to access memory would be
to use physical addresses. We call this approach physical addressing.

An example of physical addressing in the context of a load instruction that reads the word starting at physical address 4:

When the CPU executes the load instruction, it generates an effective physical address and passes it to main memory
over the memory bus. The main memory fetch es the 4-byte word starting at physical address 4 and returns it to the
CPU, which stores it in a register. Early PCs used physical addressing, and systems such as digital signal processors,
embedded microcontrollers, and Cray supercomputers continue to do so. However, modern processors use a form of
addressing known as virtual addressing.

With virtual addressing, the CPU accesses main memory by generating a virtual address (VA), which is converted to
the appropriate physical address before being sent to  the memory. The task of converting a virtual address to a
physical one is known as address transl ation. Like exception handling, address translation requires close cooperation
between the CPU hardware and the operating system. Dedicated hardware on the CP U chip called the memory
management unit (MMU) translates virtual addresses on the fly, using a look-up table stored in main memory whose
contents are managed by the operating system.

## 6. Microprocessor

### Visual Concept: 8085 / 8086 Microprocessor System Bus Interfacing
```
               ┌──────────────────────────────────────────────┐
               │         MICROPROCESSOR (CPU ARCH)            │
               │  ┌──────────────────┐  ┌──────────────────┐  │
               │  │ ALU & ACCUMULATOR│  │ REGISTER ARRAY   │  │
               │  └────────┬─────────┘  └────────┬─────────┘  │
               │           └─────────┬───────────┘            │
               └─────────────────────┼────────────────────────┘
                       ▲             │             │
        Data Bus       │             │             │ Address Bus (16/20-bit Unidirectional)
     (8/16-bit Bidi)   ▼             ▼             ▼
 ══════════════════════════════════════════════════════════════════════ System Bus
     │                 ▲             ▲             ▲
     ▼                 │             │             │
  [ RAM / ROM Memory ] ┴─────┬───────┴─────────────┴─── [ I/O Ports & Peripherals ]
                             │ Control Bus (RD#, WR#, ALE, INTR, READY)
``` Architecture

MICROPROCESSOR ARCHITECHTURE-
A computer, large or small, can be represented functionally (in a simplified form) by the block diagram in Figure. As
shown, it comprises of three basic parts or sub-systems:

(a) Central Processing Unit (CPU)
It performs the necessary arithmetic and logic operatio ns and controls the timing and general operation of the
complete system.

(b) Input/ Output (I/O) Devices
Input devices are used for feeding data into the CPU, examples of these devices are toggle switches, analog -to-digital
converters, paper tape readers, card readers, keyboards, disk etc.
The output devices are used for delivering the re sults of computations to the outside world; examples are light
emitting diodes, cathode ray tube (CRT) displays, digital -to-analog converters, card and paper -tape punches,
character printers, plotters, communication lines etc. The input output subsystem th us allows the computer to
usefully communicate with the outside world. Input-output devices are also called as peripherals.

(c) Memory
It stores both the instructions to be executed (i.e., the program) and the data involved. It usually consists of both
RAMs (random -access memories) and ROMS (read -only memories). A microprocessor is an integrated circuit
designed to function as the CPU of a microcomputer.

Internal Architecture of a MICROPROCESSOR

The microprocessor or CPU reads each instruction from the memory, decodes it and executes it. It processes the data
as required in the instructions. The processing is in the form of arithmetic and logical operations. The data is retrieved
from memory or taken from an input device and the result of processing is s tored in the memory or delivered to an
appropriate output device, all as per the instructions.

To perform all these functions, the µP (microprocessor) incorporates various  functional units in an appropriate
manner. Such an internal structure or organizatio nal structure of µP, which determines how it operates, is known as
its architecture.

A typical microprocessor architecture is shown in Figure. The various functional units are as follows:

Busses-
µC (microcomputer), like all computers, manipulates bina ry information. The binary information is represented by
binary digits, called bits. µC operates on a group of bits which are referred to as a word. The number of bits
making-µP a word varies with the µP. Common word sizes are 4, 8, 12 and 16 bits (µPs wit h 32 bit-word have also of
late entered the market). Another binary terms that will be of interest in subsequent discussions are the byte and the
nibble, which represent a set of 8 bits and 4 bits, respectively.
Figure shows busses interconnecting various blocks. These busses allow exchange of words between the blocks. A bus
has a wire or line for each bit and thus allows exchange of all bits of a word in parallel. The processing of bits in the µP
is also in parallel. The busses can thus be viewed as data h ighways. The width of a bus is the number of signal lines
that constitute the bus.
The figure shows for simplicity three busses for distinct functions. Over the address bus, the µP transmits the address
of that I/O device or memory locations which it desires to access. This address is received by all the devices connected
to the processor, but only the device which has been addressed responds. The data bus is used by the µP  to send and
receive data to and from different devices (I/O and memory) including instructions stored in memory. Obviously the
address bus is unidirectional and the data bus is bi -directional. The control bus is used for transmitting and receiving
control signals between the µP and various devices in the system.

Arithmetic-Logic Unit (ALU)
The arithmetic-logic unit is a combinational network that performs arithmetic and logical operations on the data.

Internal Registers
A number of registers are normally  included in the microprocessor. These are used for temporar y storage of data,
instructions and addresses during execution of a program. Those in the Intel µP.
8085 microprocessor are typical and are described below:
(i) Accumulator (Acc) or Result Register
This is an 8 -bit register used in various arithmetic and l ogical operations. Out of the two operands to be operated
upon, one comes from accumulator (Acc), whilst the other one may be in another internal register or may be brought
in by the data bus from the main memory. Upon completion of the arithmetic/logical operation, the result is placed in
the accumulator (replacing the earlier operand). Because of the later function, this register is also called as result
register.

(ii) General Purpose Registers or Scratch Pad Memory
There are six general purpose 8 -bit registers that can be used by the programmer for a variety of purposes. These
registers, labelled as B, C, D, E, H and L, can be used individually (e.g., when operation on 8 -bit data is desired) or in
pairs (e.g., when a 16-bit address is to be stored). Only B-C, D-E and H-L pairs are allowed.

(iii) Instruction Register (IR)
This 8-bit register stores the next instruction to be executed. At the proper time this stored word (instruction) is fed to
an instruction decoder which decodes it and supplied appropriate signals to the control unit. When the execution has
been accomplished the new word in the instruction register is processed.

(iv) Program Counter (PC)
This is a 16 -bit register which holds the  address of the next instruction that has to be fetched from  the main memory
and loaded into the instruction register. The program controlling the operation is stored in the main memory and
instructions are retrieved from this memory normally in order. Therefore, normally the address contained in the PC is
incremented after each instruction is fetched. However, certain classes of instruction can modify the PC so that the
programmer can provide for branching away from the normal program flow. Examples are instructions in the “jump”
and ‘call subroutine’ groups.

(v) Stack Pointer (SP)
This is also a 16 -bit register and is used by the programmer to maintain a stack in the memory while using
subroutines.

(vi) Status Register or Condition Flags
A status register consisting of a few flip -flops, called as condition flags (in 8085 the number of flags is five) is used to
provide indication of certain conditions that arise during arithmetic and logical operations.
These are:
‘zero’ Flag is set if result of instruction is 0.
‘sign’ Set if MSB of result is 1.
‘parity’ Set if result has even parity.
‘carry’ Set if carry or borrow resulted.
‘auxiliary carry’ Set if instruction caused a carry out of bit 3 and into bit 4 of the resulting value.

(vii) Dedicated Registers
Several other registers are incorporated in the µP for its internal operation. They cannot be accessed by the
programmer and hence do not concern much a µP user.

Instruction Decoder and Control Unit
It decodes each instruction and under the supervision of a clock controls the external and internal units ensuring
correct logical operation of the system.

SEMICONDUCTOR MEMORIES
As mentioned earlier, semiconductor memories are required in a microcomputer for storing information which may
comprise of (a) the data to be used for computation, (b) instructions and (c) computational results. A program starts as
a set of instructions on a paper, then this is transferred to a set of cards with the instructions punched in code on them.
These instructions also can be transferred to magnetic tape, paper tape or directly into se miconductor memory which
is the eventual storage space for a program. The semiconductor memory chips are connected to the µP through the
address bus, data bus and control bus. (This is also the way that I/O devices are connected to the µP).

PERIPHERAL INTERFACING
Functions
When one or more I/O devices (peripherals) are to be connected to a µP, an interface network for each device, called
peripheral interface, is required.

The interface incorporate commonly the following four functions:
(a) Buffering : Which is necessary to take care of incompatibility between the µP and the peripheral.

(b) Address Decoding : Which is required to select one of the several peripherals connected in the system.
(c) Command Decoding : Which is required for peripherals that perform actions other than data transfers.
(d) Timing and Control : All the above functions require timing and control.

## 7. Microprocessor Bus Organisation

The 8085 uses three separate busses to perform its operations
– The address bus.
– The data bus.
– The control bus.

The Address Bus
– 16 bits wide (A0 A1…A15)

- Therefore, the 8085 can access locations with numbers from 0 to 65,536. Or, the 8085 can access a total of 64K
addresses.
– “Unidirectional”.

- Information flows out of the microprocessor and into the memory or peripherals.
– When the 8085 wants to access a peripheral or a memory location, it places the 16-bit address on the address bus and
then sends the appropriate control signals.

The Data Bus
– 8 bits wide (D0 D1…D7)
– “Bi-directional”.

- Information flows both ways between the microprocessor and memory or I/O.
– The 8085 uses the data bus to transfer the binary information.
– Since the data bus has 8-bits only, then the 8085 can manipulate data 8 bits at-a-time only.

The Control Bus
– There is no real control bus. Instead, the control bus is made up of a number of single bit control signals.

Devices on I/O Bus Devices on I/O Bus-
Devices can be designed to interface with the bus, allo wing them to be compatible with any computer that uses  the
same type of I/O bus.

## 8. Digital to Analog Converters

A D/A Converter is used when the binary output from a digital system is to be converted into its equivalent analog
voltage or current. The binar y output will be a sequence of 1’s and 0’s. Thus they may be difficult to follow. But, a
D/A converter help the user to interpret easily.
Digital to Analog Converter (DAC) is a device that transforms digital data into an analog signal. According to the
Nyquist-Shannon sampling theorem, any sampled data c an be reconstructed perfectly with bandwidth and Nyquist
criteria.

A DAC can reconstruct sampled data into an analog signal with precision. The digital data may be produced from a
microprocessor, Application  Specific Integrated Circuit (ASIC), or  Field Pro grammable Gate Array (FPGA), but
ultimately the data requires the conversion to an analog signal in order to interact with the real world.

Basic Digital to Analog Converter

DAC using Weighted Resistors method
The basic operation of DAC is the ability to add inputs that will ultimately correspond to the contributions of the
various bits of the digital input. In the voltage domain, that is if the input signals are voltages, the addition of the
binary bits can be achieved using the inverting summing amplifier shown in the below figure.

The input resistors of the op-amp have their resistance values weighted in a binary format. When the receiving binary
1 the switch connects the resistor to the reference voltage. When the logic circuit receives binary 0, the switch connects
the resistor to ground. All the digital input bits are simultaneously applied to the DAC.
As the number of bits is increasing in the digital input voltage, the range of the resistor values b ecomes large and
accordingly, the accuracy becomes poor.

R-2R Ladder Digital to Analog Converter (DAC)
The R -2R ladder DAC constructed as a binary -weighted DAC that uses a repeating cascaded structure of resistor
values R and 2R. This improves the precision due to the relative ease of producing equal valued-matched resistors (or
current sources).

## 9. Boolean Algebra and Logic Gates

The flow of digital signals is controlled by transistors in various configurations depending on the logic family. For
most purposes we can imagine that the logic gates are composed of ideal switches with just two states: OPEN and
CLOSED. The state of a switch is controlled by a digital signal. The switch remains closed so long as a logical (1)
signal is applied. A logical (0) control signal keeps it open.

Logic signals interact by means of gates. The three fundamental gates AND, OR, and NOT, are named after the three
fundamental operations of logic that they carry out. The AND and OR gates each have two inputs and one output.
The output state is determined by the states of the two inputs.

The function of each gate is defined by a truth table, which specifies the output state for each possible combination of
input states. The output values of the truth tables can be understood in terms of two switches. If the switches are in
series, you get the AND function. Parallel switches perform the OR operation. A bubble after a gate or at an input
indicates NOT.
The three compound gates NAND, NOR and XOR can be made from AND, OR, and NOT. NA ND means an AND
gate followed by a NOT, while NOR means an OR gate followed by a NOT. The EXCLUSIVE -OR (XOR) is similar to
OR but it has a low output if both inputs are High.

Types of Gate-
1- NOT or INVERTER Gate

2- AND Gate

3- OR Gate

Compound Gates-
There are three types of gates-
1- NAND
2- NOR
3- XOR

### 9.1 BOOLEAN ALGEBRA

We imagine a logical variable, A, that takes on the values 0 or 1. If A = 0 then A = 1 and if A = 1 then A = 0. Here are
some obvious identities using the AND, OR and NOT operations.

Looking at these identities you can see why the ‘plus’ symbol was chosen for OR and ‘times’ was chosen for AND.

The basic Laws related to Boolean expressions-
## 1. Equality
Two Boolean expressions are equal if and only if their truth tables are identical.

## 2. Associative Laws
(A + B)+ C = A+ (B + C)
(AB)C = A(BC)

## 3. Distributive Laws
A(B + C)= AB + AC

## 4. DeMorgan’s Theorems
A

- B

- K = A + B +K
A + B +K = A

- B

- K

Example of Proof
Each of the above equalities is a theorem that can be proved. Let ’s do an example by directly comparing the truth
tables for the left and right sides. We take on DeMorgan’s first theorem for two variables,
AB = A + B :

Example of simplification
Boolean algebra can be used to simplify logical expressions and reduce th e number of gates required in a circuit. In
figure, we show two ways to implement the expression,
Y = A + A BC.

### 9.2 THE INVERTER (NOT GATE)

The inverter (NOT circuit) performs the operation called inversion or complementation. The inverter changes one
logic level to the opposite level. In terms of bits, it changes a 1 to a 0 and a 0 to a 1.
Standard logic symbols for the inverter are shown in Fig, shows the distinctive shape symbols.
