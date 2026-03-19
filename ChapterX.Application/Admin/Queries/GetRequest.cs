using MediatR;

namespace ChapterX.Application.Admin.Queries
{
    public record GetRequest(int Id) : IRequest<GetResponse>;
}
