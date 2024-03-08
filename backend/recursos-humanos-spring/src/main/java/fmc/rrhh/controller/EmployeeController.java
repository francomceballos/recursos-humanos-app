package fmc.rrhh.controller;

import fmc.rrhh.exception.ResourceNotFoundException;
import fmc.rrhh.model.Employee;
import fmc.rrhh.service.EmployeeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("rrhh-app")
@CrossOrigin(value = "http://localhost:3000")
public class EmployeeController {
    private static final Logger logger = LoggerFactory.getLogger(EmployeeController.class);

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("employees")
    public List<Employee> getEmployees(){
        var employees = employeeService.listEmployees();
        employees.forEach((employee -> logger.info(employee.toString())));
        return employees;
    }

    @PostMapping("/employees")
    public Employee addEmployee(@RequestBody Employee employee) {
        logger.info(employee.toString());
        return employeeService.saveEmployee(employee);
    }

    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Integer id){
        Employee employee = employeeService.searchEmployeeById(id);
        if (employee == null )
            throw new ResourceNotFoundException("Id not found: " + id);
        return ResponseEntity.ok(employee);
    }

    @PutMapping("/employees/{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable Integer id, @RequestBody Employee employeeRecieved){
        Employee employee = employeeService.searchEmployeeById(id);
        if (employee == null)
            throw new ResourceNotFoundException("Id not found: " + id);
        employee.setName(employeeRecieved.getName());
        employee.setArea(employeeRecieved.getArea());
        employee.setSalary(employeeRecieved.getSalary());
        employeeService.saveEmployee(employee);
        return ResponseEntity.ok(employee);
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Integer id){
        Employee employee = employeeService.searchEmployeeById(id);
        if (employee == null)
            throw new ResourceNotFoundException("id not found: " + id);
        employeeService.deleteEmployee(employee);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }



}
