import java.io.*;
import java.util.*;

final class Flight {
    final String id;
    final String plane;
    final String source;
    final String destination;

    public Flight(String id, String plane, String source, String destination) {
        this.id = id;
        this.plane = plane;
        this.source = source;
        this.destination = destination;
    }
    @Override
    public String toString() {
        return "Flight ID: " + id + ", Plane: " + plane + ", Source: " + source + ", Destination: " + destination;
    }
}

class FlightListGenerator {
    List<Flight> flights = new ArrayList<>();

    public void addFlight(Flight flight) {
        flights.add(flight);
    }

    public void printFlights() {
        for (Flight flight : flights) {
            System.out.println(flight);
        }
    }
}

public class FlightReader {
    public static void main(String[] args) {
        BufferedReader br = null;
        FlightListGenerator flightListGenerator = new FlightListGenerator();
        try {
            br = new BufferedReader(new FileReader("C:\\Users\\BUVAN T\\Documents\\IdeaProjects\\firstpro\\src\\flights.txt"));
            String line;
            while ((line = br.readLine()) != null) {
                String[] flightData = line.split("\\|");
                if (flightData.length == 4) {
                    Flight flight = new Flight(flightData[0].trim(), flightData[1].trim(), flightData[2].trim(), flightData[3].trim());
                    flightListGenerator.addFlight(flight);
                } else {
                    System.out.println("Invalid flight data: " + line);
                }
            }
            flightListGenerator.printFlights();
        } catch (IOException e) {
            System.out.println("File not found or an error occurred while reading the file: " + e.getMessage());
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    System.out.println("Error closing the BufferedReader: " + e.getMessage());
                }
            }
        }
    }
}