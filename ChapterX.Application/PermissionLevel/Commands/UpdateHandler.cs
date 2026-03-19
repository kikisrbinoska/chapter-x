using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.PermissionLevel.Commands
{
    // PermissionLevel is an enum — values cannot be updated at runtime.
    public class UpdateHandler : IRequestHandler<UpdateRequest, UpdateResponse>
    {
        private readonly ILogger<UpdateHandler> _logger;

        public UpdateHandler(ILogger<UpdateHandler> logger)
        {
            _logger = logger;
        }

        public Task<UpdateResponse> Handle(UpdateRequest request, CancellationToken cancellationToken)
        {
            _logger.LogWarning("PermissionLevel is an enum and cannot be updated at runtime.");
            return Task.FromResult(new UpdateResponse(false));
        }
    }
}
