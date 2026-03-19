using ChapterX.Application.Status.Commands;
using ChapterX.Application.Status.Queries;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ChapterX.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly ILogger<StatusController> _logger;

        public StatusController(IMediator mediator, ILogger<StatusController> logger)
        {
            _mediator = mediator;
            _logger = logger;
        }

        // GET: api/Status
        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult> GetAll()
        {
            _logger.LogInformation("Fetching all status values");
            var response = await _mediator.Send(new GetAllRequest());
            return Ok(response);
        }

        // GET: api/Status/5
        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public async Task<ActionResult> GetById([FromRoute] int id)
        {
            _logger.LogInformation("Fetching status with ID: {StatusId}", id);
            var response = await _mediator.Send(new GetRequest(id));
            return Ok(response);
        }

        // POST: api/Status
        // Note: Status is an enum in the domain; runtime changes may be limited.
        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Add([FromBody] AddRequest request)
        {
            _logger.LogInformation("Adding a new status value");
            var response = await _mediator.Send(request);
            return Ok(response);
        }

        // PUT: api/Status/5
        [HttpPut("{id:int}")]
        [Authorize]
        public async Task<ActionResult> Update([FromRoute] int id)
        {
            _logger.LogInformation("Updating status with ID: {StatusId}", id);
            var response = await _mediator.Send(new UpdateRequest(id));
            return Ok(response);
        }

        // DELETE: api/Status
        [HttpDelete]
        [Authorize]
        public async Task<ActionResult> Delete([FromBody] DeleteRequest request)
        {
            _logger.LogInformation("Deleting a status value");
            var response = await _mediator.Send(request);
            return Ok(response);
        }
    }
}

