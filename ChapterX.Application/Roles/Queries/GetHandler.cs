using ChapterX.Domain.Repositories;
using MediatR;
using Microsoft.Extensions.Logging;

namespace ChapterX.Application.Roles.Queries
{
    public class GetHandler : IRequestHandler<GetRequest, GetResponse>
    {
        private readonly IRolesRepository _rolesRepository;
        private readonly ILogger<GetHandler> _logger;

        public GetHandler(IRolesRepository rolesRepository, ILogger<GetHandler> logger)
        {
            _rolesRepository = rolesRepository;
            _logger = logger;
        }

        public async Task<GetResponse> Handle(GetRequest request, CancellationToken cancellationToken)
        {
            var role = await _rolesRepository.GetByIdAsync(request.Id, cancellationToken);
            return new GetResponse(role);
        }
    }
}
